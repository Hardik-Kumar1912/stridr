import { auth, clerkClient } from '@clerk/nextjs/server'

export async function POST(req) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = await clerkClient()

  try {
    const body = await req.json()
    const { name, age, address, gender, profileImage, priorities } = body

    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        age,
        address,
        gender,
        priorities,
        profileImage,
      },
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('Error saving profile:', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}