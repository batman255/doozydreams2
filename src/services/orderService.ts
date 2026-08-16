import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order, OrderTimelineStep } from '../types';
import { INITIAL_ORDERS } from '../data/orders';

export async function getOrders(userId?: string): Promise<{ data: Order[]; error: string | null }> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data: dbOrders, error: orderErr } = await query;
      if (orderErr) {
        console.warn('Error fetching orders from Supabase:', orderErr.message);
        return { data: getLocalOrders(), error: orderErr.message };
      }

      if (dbOrders && dbOrders.length > 0) {
        // Fetch order items & timeline for each order
        const ordersWithItems: Order[] = await Promise.all(
          dbOrders.map(async (o) => {
            const { data: items } = await supabase!
              .from('order_items')
              .select('*')
              .eq('order_id', o.id);

            const { data: timelineSteps } = await supabase!
              .from('order_timeline')
              .select('*')
              .eq('order_id', o.id)
              .order('display_order', { ascending: true });

            return {
              id: o.id,
              createdAt: o.created_at,
              customer: {
                fullName: o.customer_full_name,
                email: o.customer_email,
                phone: o.customer_phone,
                address: o.customer_address,
                city: o.customer_city,
                state: o.customer_state,
                zip: o.customer_zip,
                country: o.customer_country,
              },
              items: (items || []).map((i) => ({
                productId: i.product_id,
                title: i.title,
                sku: i.sku,
                image: i.image,
                price: Number(i.price),
                color: i.color,
                size: i.size,
                quantity: i.quantity,
              })),
              subtotal: Number(o.subtotal),
              discount: Number(o.discount || 0),
              shipping: Number(o.shipping || 0),
              total: Number(o.total),
              promoCode: o.promo_code || undefined,
              giftWrap: Boolean(o.gift_wrap),
              giftMessage: o.gift_message || undefined,
              deliveryMethod: o.delivery_method as any,
              paymentMethod: o.payment_method as any,
              paymentStatus: o.payment_status as any,
              status: o.status as any,
              trackingNumber: o.tracking_number || '',
              estimatedDelivery: o.estimated_delivery || '4-6 business days',
              timeline: (timelineSteps && timelineSteps.length > 0)
                ? timelineSteps.map((t) => ({
                    status: t.status,
                    date: t.date,
                    description: t.description,
                    completed: Boolean(t.completed),
                    current: Boolean(t.is_current),
                  }))
                : defaultTimeline(o.status),
            };
          })
        );

        return { data: ordersWithItems, error: null };
      }
    } catch (err: any) {
      console.warn('Supabase orders fetch failed:', err);
    }
  }

  return { data: getLocalOrders(), error: null };
}

export async function saveOrder(order: Order, userId?: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error: orderErr } = await supabase.from('orders').insert({
        id: order.id,
        user_id: userId || null,
        customer_full_name: order.customer.fullName,
        customer_email: order.customer.email,
        customer_phone: order.customer.phone,
        customer_address: order.customer.address,
        customer_city: order.customer.city,
        customer_state: order.customer.state,
        customer_zip: order.customer.zip,
        customer_country: order.customer.country,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        total: order.total,
        promo_code: order.promoCode || null,
        gift_wrap: order.giftWrap,
        gift_message: order.giftMessage || null,
        delivery_method: order.deliveryMethod,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus,
        status: order.status,
        tracking_number: order.trackingNumber,
        estimated_delivery: order.estimatedDelivery,
        created_at: order.createdAt,
      });

      if (orderErr) {
        console.warn('Supabase insert order error:', orderErr);
        return { success: false, error: orderErr.message };
      }

      // Insert items
      if (order.items && order.items.length > 0) {
        const itemRows = order.items.map((it) => ({
          order_id: order.id,
          product_id: it.productId,
          title: it.title,
          sku: it.sku,
          image: it.image,
          price: it.price,
          color: it.color,
          size: it.size,
          quantity: it.quantity,
        }));
        await supabase.from('order_items').insert(itemRows);
      }

      // Insert timeline
      if (order.timeline && order.timeline.length > 0) {
        const timelineRows = order.timeline.map((t, idx) => ({
          order_id: order.id,
          status: t.status,
          description: t.description,
          date: t.date,
          completed: t.completed,
          is_current: Boolean(t.current),
          display_order: idx,
        }));
        await supabase.from('order_timeline').insert(timelineRows);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // Fallback to local storage
  const current = getLocalOrders();
  const updated = [order, ...current];
  try {
    localStorage.setItem('dd_orders', JSON.stringify(updated));
  } catch (e) {
    // ignore
  }

  return { success: true };
}

export async function updateOrderStatusInDb(orderId: string, status: Order['status'], trackingNumber?: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const updatePayload: any = { status };
      if (trackingNumber) {
        updatePayload.tracking_number = trackingNumber;
      }
      const { error } = await supabase
        .from('orders')
        .update(updatePayload)
        .eq('id', orderId);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  return { success: true };
}

function getLocalOrders(): Order[] {
  try {
    const saved = localStorage.getItem('dd_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  } catch {
    return INITIAL_ORDERS;
  }
}

function defaultTimeline(status: string): OrderTimelineStep[] {
  return [
    { status: 'Order Confirmed', date: 'Just now', description: 'Order verified by DOOZY Atelier VIP Concierge', completed: true, current: status === 'Pending' },
    { status: 'Tailoring & QC', date: 'Pending', description: 'White-glove garment calibration and inspection', completed: status !== 'Pending' },
    { status: 'Handcrafted Packaging', date: 'Pending', description: 'Placed in signature obsidian box with wax seal', completed: ['Handcrafted Packaging', 'Dispatched', 'Delivered'].includes(status) },
    { status: 'Dispatched', date: 'Pending', description: 'Direct insured express transit', completed: ['Dispatched', 'Delivered'].includes(status) },
    { status: 'Delivered', date: 'Pending', description: 'White-glove doorstep handover', completed: status === 'Delivered' },
  ];
}
