import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const { id, firstName, lastName, email, shipping, password } = await req.json();
    const baseUrl = process.env.WC_SITE_URL || 'https://sleigh.staymedia.ng';
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    const payload: any = {
      first_name: firstName,
      last_name: lastName,
    };

    // If password reset is requested
    if (password) {
      payload.password = password;
    }

    // If address update is requested
    if (shipping) {
      const addressData = {
        first_name: shipping.first_name || firstName,
        last_name: shipping.last_name || lastName,
        company: '',
        address_1: shipping.address_1,
        address_2: '',
        city: shipping.city,
        state: shipping.state,
        postcode: '000000', // Mandatory for WC validation
        country: 'NG',
        email: email || '', // Mandatory for billing validation
        phone: shipping.phone
      };
      payload.shipping = addressData;
      payload.billing = addressData; // Sync to billing for checkout hydration
    }

    const response = await fetch(`${baseUrl}/wp-json/wc/v3/customers/${id}?consumer_key=${ck}&consumer_secret=${cs}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Update failed' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Profile updated', customer: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
