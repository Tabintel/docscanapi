import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req) {
  const { img, key } = await req.json()
  // The prompt specifies using axios.get for the PixLab API call to avoid CORS issues,
  // even though the client sends a POST request to this route.
  const url = `https://api.pixlab.io/docscan?img=${encodeURIComponent(img)}&type=idcard&key=${key}`
  try {
    const response = await axios.get(url)
    return NextResponse.json(response.data)
  } catch (error) {
    return NextResponse.json(
      { message: error.response?.data?.message || error.message },
      { status: error.response?.status || 500 },
    )
  }
}
