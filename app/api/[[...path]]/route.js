import { NextResponse } from 'next/server'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL

if (!uri) {
  throw new Error('MONGO_URL environment variable is not defined')
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

let db

async function connectDB() {
  if (!db) {
    await client.connect()
    db = client.db('cargo_app')
  }
  return db
}

function generateTrackingNumber() {
  const prefix = 'KH'
  const random = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}${random}`
}

// Create shipment
async function createShipment(data) {
  const database = await connectDB()
  const shipments = database.collection('shipments')

  const shipment = {
    id: uuidv4(),
    trackingNumber: generateTrackingNumber(),
    sender: data.sender,
    receiver: data.receiver,
    package: data.package,
    delivery: data.delivery,
    notes: data.notes || '',
    photo: data.photo || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  await shipments.insertOne(shipment)
  return shipment
}

// Get all shipments
async function getShipments() {
  const database = await connectDB()
  const shipments = database.collection('shipments')
  const allShipments = await shipments.find({}).sort({ createdAt: -1 }).toArray()
  return allShipments
}

// Get shipment by tracking number
async function getShipmentByTracking(trackingNumber) {
  const database = await connectDB()
  const shipments = database.collection('shipments')
  const shipment = await shipments.findOne({ trackingNumber })
  return shipment
}

// Update shipment status
async function updateShipmentStatus(trackingNumber, status) {
  const database = await connectDB()
  const shipments = database.collection('shipments')
  
  const result = await shipments.updateOne(
    { trackingNumber },
    { 
      $set: { 
        status,
        updatedAt: new Date().toISOString()
      } 
    }
  )
  
  return result.modifiedCount > 0
}

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')

    // Get all shipments
    if (path === 'shipments' || path === '') {
      const shipments = await getShipments()
      return NextResponse.json({ 
        success: true, 
        shipments,
        count: shipments.length 
      })
    }

    // Track shipment
    if (path.startsWith('track/')) {
      const trackingNumber = path.split('/')[1]
      
      if (!trackingNumber) {
        return NextResponse.json(
          { error: 'Takip numarası gerekli' },
          { status: 400 }
        )
      }

      const shipment = await getShipmentByTracking(trackingNumber)
      
      if (!shipment) {
        return NextResponse.json(
          { error: 'Gönderi bulunamadı' },
          { status: 404 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        shipment 
      })
    }

    return NextResponse.json(
      { error: 'Endpoint bulunamadı' },
      { status: 404 }
    )
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')

    // Create shipment
    if (path === 'shipments' || path === '') {
      const data = await request.json()

      // Validation
      if (!data.sender?.name || !data.sender?.phone || !data.sender?.address) {
        return NextResponse.json(
          { error: 'Gönderici bilgileri eksik' },
          { status: 400 }
        )
      }

      if (!data.receiver?.name || !data.receiver?.phone || !data.receiver?.address) {
        return NextResponse.json(
          { error: 'Alıcı bilgileri eksik' },
          { status: 400 }
        )
      }

      if (!data.package?.type || !data.package?.weight) {
        return NextResponse.json(
          { error: 'Paket bilgileri eksik' },
          { status: 400 }
        )
      }

      const shipment = await createShipment(data)

      return NextResponse.json({
        success: true,
        message: 'Gönderi başarıyla oluşturuldu',
        shipment
      }, { status: 201 })
    }

    return NextResponse.json(
      { error: 'Endpoint bulunamadı' },
      { status: 404 }
    )
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')

    // Update shipment status
    if (path.startsWith('shipments/')) {
      const trackingNumber = path.split('/')[1]
      const data = await request.json()

      if (!trackingNumber) {
        return NextResponse.json(
          { error: 'Takip numarası gerekli' },
          { status: 400 }
        )
      }

      if (!data.status) {
        return NextResponse.json(
          { error: 'Durum bilgisi gerekli' },
          { status: 400 }
        )
      }

      const updated = await updateShipmentStatus(trackingNumber, data.status)

      if (!updated) {
        return NextResponse.json(
          { error: 'Gönderi bulunamadı veya güncellenemedi' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Durum güncellendi'
      })
    }

    return NextResponse.json(
      { error: 'Endpoint bulunamadı' },
      { status: 404 }
    )
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')

    // Delete shipment
    if (path.startsWith('shipments/')) {
      const trackingNumber = path.split('/')[1]

      if (!trackingNumber) {
        return NextResponse.json(
          { error: 'Takip numarası gerekli' },
          { status: 400 }
        )
      }

      const database = await connectDB()
      const shipments = database.collection('shipments')
      const result = await shipments.deleteOne({ trackingNumber })

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: 'Gönderi bulunamadı' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Gönderi silindi'
      })
    }

    return NextResponse.json(
      { error: 'Endpoint bulunamadı' },
      { status: 404 }
    )
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json(
      { error: error.message || 'Sunucu hatası' },
      { status: 500 }
    )
  }
}