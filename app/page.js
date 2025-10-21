'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Upload, Truck, CheckCircle, MapPin, Calendar, Weight, Camera, User, Mail, Phone, Home, Search, Clock, Shield, Zap, ArrowRight, Download, QrCode, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className="min-h-screen bg-[#FDF4E3]">
      <Toaster />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'create' && <CreateShipmentPage setCurrentPage={setCurrentPage} toast={toast} />}
        {currentPage === 'tracking' && <TrackingPage />}
        {currentPage === 'account' && <AccountPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin' && <AdminPage />}
      </AnimatePresence>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#FDF4E3] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          <Package className="w-20 h-20 text-[#134686]" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-2xl font-bold text-[#134686]"
        >
          KargoHızlı
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 h-1 bg-[#ED3F27] mx-auto rounded-full"
        />
      </motion.div>
    </div>
  )
}

function Header({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="bg-[#134686] p-2 rounded-xl">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#134686]">KargoHızlı</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink active={currentPage === 'home'} onClick={() => setCurrentPage('home')}>Anasayfa</NavLink>
            <NavLink active={currentPage === 'create'} onClick={() => setCurrentPage('create')}>Gönderi Oluştur</NavLink>
            <NavLink active={currentPage === 'tracking'} onClick={() => setCurrentPage('tracking')}>Takip</NavLink>
            <NavLink active={currentPage === 'account'} onClick={() => setCurrentPage('account')}>Hesabım</NavLink>
            <NavLink active={currentPage === 'admin'} onClick={() => setCurrentPage('admin')}>Admin</NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#134686]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 pb-4 space-y-2"
            >
              <MobileNavLink active={currentPage === 'home'} onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>Anasayfa</MobileNavLink>
              <MobileNavLink active={currentPage === 'create'} onClick={() => { setCurrentPage('create'); setMobileMenuOpen(false); }}>Gönderi Oluştur</MobileNavLink>
              <MobileNavLink active={currentPage === 'tracking'} onClick={() => { setCurrentPage('tracking'); setMobileMenuOpen(false); }}>Takip</MobileNavLink>
              <MobileNavLink active={currentPage === 'account'} onClick={() => { setCurrentPage('account'); setMobileMenuOpen(false); }}>Hesabım</MobileNavLink>
              <MobileNavLink active={currentPage === 'admin'} onClick={() => { setCurrentPage('admin'); setMobileMenuOpen(false); }}>Admin</MobileNavLink>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

function NavLink({ children, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`font-medium transition-colors ${active ? 'text-[#ED3F27]' : 'text-gray-600 hover:text-[#134686]'}`}
    >
      {children}
    </motion.button>
  )
}

function MobileNavLink({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${active ? 'bg-[#134686] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {children}
    </button>
  )
}

function HomePage({ setCurrentPage }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#134686] to-[#1a5ba8] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Şubeye Gitmeden <span className="text-[#FEB21A]">Online</span> Kargo Gönderimi
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Hızlı, güvenli ve kolay. Kargo içeriğinizin fotoğrafını çekin, bilgileri girin ve kurye kapınıza gelsin.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-[#ED3F27] hover:bg-[#d63520] text-white text-lg px-8 py-6 rounded-2xl shadow-lg"
                  onClick={() => setCurrentPage('create')}
                >
                  Gönderini Oluştur <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#FEB21A] rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <FeatureCard icon={<Zap />} title="Hızlı" />
                    <FeatureCard icon={<Shield />} title="Güvenli" />
                    <FeatureCard icon={<Camera />} title="Fotoğraflı" />
                    <FeatureCard icon={<Truck />} title="Kapıda" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#134686] mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">3 basit adımda kargonuz yolda</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon={<Upload className="w-12 h-12" />}
              title="Bilgileri Gir"
              description="Gönderici ve alıcı bilgilerini, paket detaylarını ekle"
              delay={0.2}
            />
            <StepCard
              number="2"
              icon={<Camera className="w-12 h-12" />}
              title="Fotoğraf Yükle"
              description="Güvenlik için kargo içeriğinin fotoğrafını çek ve yükle"
              delay={0.4}
            />
            <StepCard
              number="3"
              icon={<Truck className="w-12 h-12" />}
              title="Kuryeyi Seç"
              description="Teslimat seçeneğini belirle, QR kodunu al ve kurye gelsin"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-[#FDF4E3]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-[#134686] mb-6">Güvenlik ve Gizlilik Önceliğimiz</h2>
              <div className="space-y-4">
                <SecurityFeature icon={<Shield />} text="Şifreli veri transferi" />
                <SecurityFeature icon={<Camera />} text="Fotoğraflarınız güvenle saklanır" />
                <SecurityFeature icon={<CheckCircle />} text="KVKK ve GDPR uyumlu" />
                <SecurityFeature icon={<Clock />} text="7/24 müşteri desteği" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#134686] to-[#1a5ba8] p-12 rounded-3xl text-white text-center"
            >
              <Shield className="w-24 h-24 mx-auto mb-6 text-[#FEB21A]" />
              <h3 className="text-2xl font-bold mb-4">%100 Güvenli İşlem</h3>
              <p className="text-gray-200">Tüm verileriniz şifreli olarak saklanır ve işlenir</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ED3F27] to-[#ff5a3d] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Hemen Başlayın</h2>
            <p className="text-xl mb-8 text-gray-100">İlk gönderinizi oluşturun ve farkı görün</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-[#ED3F27] hover:bg-gray-100 text-lg px-8 py-6 rounded-2xl shadow-lg font-bold"
                onClick={() => setCurrentPage('create')}
              >
                Gönderi Oluştur <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

function FeatureCard({ icon, title }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/30"
    >
      <div className="text-[#FEB21A] mb-2">{icon}</div>
      <p className="font-semibold">{title}</p>
    </motion.div>
  )
}

function StepCard({ number, icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -10 }}
    >
      <Card className="relative overflow-hidden border-2 border-transparent hover:border-[#134686] transition-all duration-300 h-full">
        <div className="absolute top-4 right-4 text-8xl font-bold text-[#FDF4E3]">{number}</div>
        <CardHeader>
          <div className="bg-[#134686] w-20 h-20 rounded-2xl flex items-center justify-center mb-4 text-white">
            {icon}
          </div>
          <CardTitle className="text-2xl text-[#134686]">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SecurityFeature({ icon, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
    >
      <div className="bg-[#134686] p-3 rounded-xl text-white">{icon}</div>
      <span className="text-gray-800 font-medium">{text}</span>
    </motion.div>
  )
}

function CreateShipmentPage({ setCurrentPage, toast }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    receiverAddress: '',
    packageType: '',
    weight: '',
    dimensions: '',
    deliveryType: 'standard',
    pickupDate: '',
    notes: '',
    photo: null,
    photoPreview: null,
    agreeToTerms: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [confirmationData, setConfirmationData] = useState(null)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Dosya çok büyük',
          description: 'Lütfen 5MB altında bir fotoğraf seçin',
          variant: 'destructive'
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        updateField('photo', file)
        updateField('photoPreview', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast({
        title: 'Onay gerekli',
        description: 'KVKK ve kullanım şartlarını kabul etmelisiniz',
        variant: 'destructive'
      })
      return
    }

    setSubmitting(true)

    try {
      const submitData = {
        sender: {
          name: formData.senderName,
          phone: formData.senderPhone,
          email: formData.senderEmail,
          address: formData.senderAddress
        },
        receiver: {
          name: formData.receiverName,
          phone: formData.receiverPhone,
          email: formData.receiverEmail,
          address: formData.receiverAddress
        },
        package: {
          type: formData.packageType,
          weight: formData.weight,
          dimensions: formData.dimensions
        },
        delivery: {
          type: formData.deliveryType,
          pickupDate: formData.pickupDate
        },
        notes: formData.notes,
        photo: formData.photoPreview
      }

      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (response.ok) {
        setConfirmationData(data.shipment)
        toast({
          title: 'Başarılı!',
          description: 'Gönderiniz oluşturuldu'
        })
      } else {
        throw new Error(data.error || 'Bir hata oluştu')
      }
    } catch (error) {
      toast({
        title: 'Hata',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmationData) {
    return <ConfirmationPage shipment={confirmationData} setCurrentPage={setCurrentPage} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#134686] mb-2">Gönderi Oluştur</h1>
          <p className="text-gray-600">Kargo bilgilerinizi girin ve gönderinizi oluşturun</p>
        </motion.div>

        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#134686] -z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            <StepperItem number={1} title="Bilgiler" active={step >= 1} completed={step > 1} />
            <StepperItem number={2} title="Paket Detayları" active={step >= 2} completed={step > 2} />
            <StepperItem number={3} title="Fotoğraf" active={step >= 3} completed={step > 3} />
            <StepperItem number={4} title="Onay" active={step >= 4} completed={false} />
          </div>
        </div>

        <Card className="border-2">
          <CardContent className="pt-6">
            {step === 1 && (
              <Step1Form formData={formData} updateField={updateField} />
            )}
            {step === 2 && (
              <Step2Form formData={formData} updateField={updateField} />
            )}
            {step === 3 && (
              <Step3Form formData={formData} handlePhotoUpload={handlePhotoUpload} />
            )}
            {step === 4 && (
              <Step4Form formData={formData} updateField={updateField} />
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => step > 1 ? setStep(step - 1) : setCurrentPage('home')}
                className="border-[#134686] text-[#134686] hover:bg-[#134686] hover:text-white"
              >
                {step > 1 ? 'Geri' : 'İptal'}
              </Button>
              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-[#134686] hover:bg-[#0f3565] text-white"
                >
                  Devam Et <ChevronRight className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.agreeToTerms}
                  className="bg-[#ED3F27] hover:bg-[#d63520] text-white"
                >
                  {submitting ? 'Gönderiliyor...' : 'Gönder'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function StepperItem({ number, title, active, completed }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{
          scale: active ? 1.1 : 1,
          backgroundColor: completed ? '#10b981' : active ? '#134686' : '#e5e7eb'
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10`}
      >
        {completed ? <CheckCircle className="w-6 h-6" /> : number}
      </motion.div>
      <span className={`mt-2 text-sm font-medium ${active ? 'text-[#134686]' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  )
}

function Step1Form({ formData, updateField }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-bold text-[#134686] mb-4 flex items-center gap-2">
          <User className="w-5 h-5" /> Gönderici Bilgileri
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="senderName">Ad Soyad *</Label>
            <Input
              id="senderName"
              value={formData.senderName}
              onChange={(e) => updateField('senderName', e.target.value)}
              placeholder="Ahmet Yılmaz"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="senderPhone">Telefon *</Label>
            <Input
              id="senderPhone"
              value={formData.senderPhone}
              onChange={(e) => updateField('senderPhone', e.target.value)}
              placeholder="0532 123 45 67"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="senderEmail">E-posta</Label>
            <Input
              id="senderEmail"
              type="email"
              value={formData.senderEmail}
              onChange={(e) => updateField('senderEmail', e.target.value)}
              placeholder="ahmet@example.com"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="senderAddress">Adres *</Label>
            <Textarea
              id="senderAddress"
              value={formData.senderAddress}
              onChange={(e) => updateField('senderAddress', e.target.value)}
              placeholder="Tam adres"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-xl font-bold text-[#134686] mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Alıcı Bilgileri
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="receiverName">Ad Soyad *</Label>
            <Input
              id="receiverName"
              value={formData.receiverName}
              onChange={(e) => updateField('receiverName', e.target.value)}
              placeholder="Ayşe Demir"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="receiverPhone">Telefon *</Label>
            <Input
              id="receiverPhone"
              value={formData.receiverPhone}
              onChange={(e) => updateField('receiverPhone', e.target.value)}
              placeholder="0532 987 65 43"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="receiverEmail">E-posta</Label>
            <Input
              id="receiverEmail"
              type="email"
              value={formData.receiverEmail}
              onChange={(e) => updateField('receiverEmail', e.target.value)}
              placeholder="ayse@example.com"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="receiverAddress">Adres *</Label>
            <Textarea
              id="receiverAddress"
              value={formData.receiverAddress}
              onChange={(e) => updateField('receiverAddress', e.target.value)}
              placeholder="Tam adres"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Step2Form({ formData, updateField }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#134686] mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" /> Paket Bilgileri
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="packageType">Paket Türü *</Label>
            <Select value={formData.packageType} onValueChange={(value) => updateField('packageType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Evrak</SelectItem>
                <SelectItem value="package">Paket</SelectItem>
                <SelectItem value="box">Kutu</SelectItem>
                <SelectItem value="pallet">Palet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="weight">Ağırlık (kg) *</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => updateField('weight', e.target.value)}
              placeholder="0.5"
              className="mt-1"
              step="0.1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="dimensions">Boyutlar (cm)</Label>
            <Input
              id="dimensions"
              value={formData.dimensions}
              onChange={(e) => updateField('dimensions', e.target.value)}
              placeholder="Örn: 30x20x10"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-xl font-bold text-[#134686] mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5" /> Teslimat Seçenekleri
        </h3>
        <div className="space-y-4">
          <div>
            <Label>Teslimat Türü *</Label>
            <RadioGroup value={formData.deliveryType} onValueChange={(value) => updateField('deliveryType', value)} className="mt-2">
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="cursor-pointer flex-1">
                  <div className="font-medium">Standart Teslimat</div>
                  <div className="text-sm text-gray-500">2-3 iş günü - Ekonomik</div>
                </Label>
                <Badge className="bg-[#134686]">₺29</Badge>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="cursor-pointer flex-1">
                  <div className="font-medium">Ekspres Teslimat</div>
                  <div className="text-sm text-gray-500">1 iş günü - Hızlı</div>
                </Label>
                <Badge className="bg-[#ED3F27]">₺59</Badge>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="pickupDate">Alış Tarihi *</Label>
            <Input
              id="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={(e) => updateField('pickupDate', e.target.value)}
              className="mt-1"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notlar</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Ek notlarınız varsa yazabilirsiniz"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Step3Form({ formData, handlePhotoUpload }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#134686] mb-2 flex items-center gap-2">
          <Camera className="w-5 h-5" /> Kargo İçeriği Fotoğrafı *
        </h3>
        <p className="text-gray-600 mb-6">Güvenlik amaçlı kargo içeriğinizin fotoğrafını yükleyin</p>

        <div className="border-2 border-dashed border-[#134686] rounded-2xl p-8 text-center bg-white hover:bg-gray-50 transition-colors">
          {formData.photoPreview ? (
            <div className="space-y-4">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={formData.photoPreview}
                alt="Preview"
                className="max-h-96 mx-auto rounded-xl shadow-lg"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('photoInput').click()}
                className="border-[#134686] text-[#134686]"
              >
                Farklı Fotoğraf Seç
              </Button>
            </div>
          ) : (
            <div>
              <Camera className="w-24 h-24 mx-auto text-[#134686] mb-4" />
              <h4 className="text-lg font-semibold text-[#134686] mb-2">Fotoğraf Yükle</h4>
              <p className="text-gray-600 mb-4">Kargo içeriğinizin net bir fotoğrafını çekin</p>
              <Button
                onClick={() => document.getElementById('photoInput').click()}
                className="bg-[#134686] hover:bg-[#0f3565] text-white"
              >
                <Upload className="mr-2" /> Fotoğraf Seç
              </Button>
              <p className="text-sm text-gray-500 mt-4">Maksimum dosya boyutu: 5MB</p>
            </div>
          )}
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-[#134686] mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Gizlilik Bilgisi
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Fotoğrafınız şifreli olarak saklanır</li>
            <li>• EXIF verileri otomatik olarak temizlenir</li>
            <li>• Sadece yetkili kargo personeli görebilir</li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function Step4Form({ formData, updateField }) {
  const totalPrice = formData.deliveryType === 'express' ? 59 : 29

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#134686] mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Özet ve Onay
        </h3>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gönderici</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Ad:</strong> {formData.senderName || '-'}</p>
              <p><strong>Telefon:</strong> {formData.senderPhone || '-'}</p>
              <p><strong>Adres:</strong> {formData.senderAddress || '-'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alıcı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Ad:</strong> {formData.receiverName || '-'}</p>
              <p><strong>Telefon:</strong> {formData.receiverPhone || '-'}</p>
              <p><strong>Adres:</strong> {formData.receiverAddress || '-'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paket Detayları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Tür:</strong> {formData.packageType || '-'}</p>
              <p><strong>Ağırlık:</strong> {formData.weight ? `${formData.weight} kg` : '-'}</p>
              <p><strong>Teslimat:</strong> {formData.deliveryType === 'express' ? 'Ekspres' : 'Standart'}</p>
              <p><strong>Alış Tarihi:</strong> {formData.pickupDate || '-'}</p>
            </CardContent>
          </Card>

          <Card className="border-[#134686] border-2">
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Toplam Tutar</span>
                <span className="text-2xl text-[#ED3F27]">₺{totalPrice}</span>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => updateField('agreeToTerms', e.target.checked)}
              className="mt-1 w-5 h-5 text-[#134686] rounded"
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              <span className="font-semibold text-[#134686]">KVKK ve Kullanım Şartları:</span> Kişisel verilerimin işlenmesine ve kargo gönderimi için kullanılmasına onay veriyorum. Fotoğraflarımın güvenli şekilde saklanacağını kabul ediyorum.
            </Label>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ConfirmationPage({ shipment, setCurrentPage }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-block bg-green-100 p-6 rounded-full mb-4"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#134686] mb-2">Gönderiniz Oluşturuldu!</h1>
          <p className="text-gray-600">Takip numaranız ile gönderinizi takip edebilirsiniz</p>
        </motion.div>

        <Card className="border-2 border-[#134686]">
          <CardHeader className="bg-[#134686] text-white rounded-t-xl">
            <CardTitle className="text-center text-2xl">Takip Numarası</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-xl mb-4">
                <p className="text-3xl font-bold text-[#134686] tracking-wider">{shipment.trackingNumber}</p>
              </div>
              <div className="bg-white p-6 border rounded-xl">
                <QRCodeDisplay value={shipment.trackingNumber} />
              </div>
            </div>

            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gönderici:</span>
                <span className="font-semibold">{shipment.sender.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Alıcı:</span>
                <span className="font-semibold">{shipment.receiver.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Teslimat:</span>
                <span className="font-semibold">{shipment.delivery.type === 'express' ? 'Ekspres' : 'Standart'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Durum:</span>
                <Badge className="bg-[#FEB21A] text-[#134686]">Beklemede</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <Button
                variant="outline"
                className="border-[#134686] text-[#134686] hover:bg-[#134686] hover:text-white"
                onClick={() => window.print()}
              >
                <Download className="mr-2 w-4 h-4" /> PDF İndir
              </Button>
              <Button
                className="bg-[#ED3F27] hover:bg-[#d63520] text-white"
                onClick={() => setCurrentPage('tracking')}
              >
                <Search className="mr-2 w-4 h-4" /> Takip Et
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl text-sm">
              <p className="text-gray-700">
                <strong className="text-[#134686]">📧 Bildirim:</strong> Rezervasyon onayı e-posta ve SMS ile gönderildi (Mock)
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => setCurrentPage('home')}
            className="border-[#134686] text-[#134686] hover:bg-[#134686] hover:text-white"
          >
            Anasayfaya Dön
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

function QRCodeDisplay({ value }) {
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    const QRCode = require('qrcode')
    QRCode.toDataURL(value, {
      width: 200,
      margin: 2,
      color: {
        dark: '#134686',
        light: '#FFFFFF'
      }
    }).then(setQrDataUrl)
  }, [value])

  return qrDataUrl ? (
    <img src={qrDataUrl} alt="QR Code" className="mx-auto" />
  ) : (
    <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse mx-auto rounded" />
  )
}

function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Lütfen takip numarası girin')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/track/${trackingNumber}`)
      const data = await response.json()

      if (response.ok) {
        setShipment(data.shipment)
      } else {
        setError(data.error || 'Gönderi bulunamadı')
        setShipment(null)
      }
    } catch (err) {
      setError('Bir hata oluştu')
      setShipment(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#134686] mb-2">Kargo Takip</h1>
          <p className="text-gray-600">Takip numaranızı girerek kargonuzun durumunu öğrenin</p>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Takip numaranızı girin (örn: KH123456)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1"
              />
              <Button
                onClick={handleTrack}
                disabled={loading}
                className="bg-[#134686] hover:bg-[#0f3565] text-white px-8"
              >
                {loading ? 'Sorgulanıyor...' : <><Search className="mr-2 w-4 h-4" /> Sorgula</>}
              </Button>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-600 mt-4 text-center"
              >
                {error}
              </motion.p>
            )}
          </CardContent>
        </Card>

        {shipment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="border-2 border-[#134686]">
              <CardHeader className="bg-[#134686] text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Gönderi Detayları</span>
                  <Badge className="bg-[#FEB21A] text-[#134686]">{shipment.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-[#134686] mb-2">Gönderici</h3>
                    <p className="text-sm">{shipment.sender.name}</p>
                    <p className="text-sm text-gray-600">{shipment.sender.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#134686] mb-2">Alıcı</h3>
                    <p className="text-sm">{shipment.receiver.name}</p>
                    <p className="text-sm text-gray-600">{shipment.receiver.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#134686]">Kargo Hareketleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TrackingStep
                    icon={<CheckCircle className="w-5 h-5" />}
                    title="Gönderi Oluşturuldu"
                    date={shipment.createdAt}
                    active
                  />
                  <TrackingStep
                    icon={<Package className="w-5 h-5" />}
                    title="Şubede Hazırlanıyor"
                    date="Bekleniyor"
                    active={false}
                  />
                  <TrackingStep
                    icon={<Truck className="w-5 h-5" />}
                    title="Dağıtımda"
                    date="Bekleniyor"
                    active={false}
                  />
                  <TrackingStep
                    icon={<Home className="w-5 h-5" />}
                    title="Teslim Edildi"
                    date="Bekleniyor"
                    active={false}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function TrackingStep({ icon, title, date, active }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-full ${active ? 'bg-[#134686] text-white' : 'bg-gray-200 text-gray-500'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={`font-semibold ${active ? 'text-[#134686]' : 'text-gray-500'}`}>{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      {active && <CheckCircle className="w-6 h-6 text-green-600" />}
    </div>
  )
}

function AccountPage({ setCurrentPage }) {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchShipments()
  }, [])

  const fetchShipments = async () => {
    try {
      const response = await fetch('/api/shipments')
      const data = await response.json()
      if (response.ok) {
        setShipments(data.shipments || [])
      }
    } catch (err) {
      console.error('Error fetching shipments:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#134686] mb-2">Hesabım</h1>
          <p className="text-gray-600">Gönderi geçmişinizi ve bilgilerinizi görüntüleyin</p>
        </motion.div>

        <Tabs defaultValue="shipments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="shipments">Gönderilerim</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="addresses">Adresler</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-[#134686] border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : shipments.length > 0 ? (
              <div className="grid gap-4">
                {shipments.map((shipment) => (
                  <Card key={shipment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{shipment.trackingNumber}</CardTitle>
                          <CardDescription>{new Date(shipment.createdAt).toLocaleDateString('tr-TR')}</CardDescription>
                        </div>
                        <Badge className="bg-[#FEB21A] text-[#134686]">{shipment.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Alıcı:</p>
                          <p className="font-semibold">{shipment.receiver.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Teslimat:</p>
                          <p className="font-semibold">{shipment.delivery.type === 'express' ? 'Ekspres' : 'Standart'}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setCurrentPage('tracking')
                          }}
                          className="border-[#134686] text-[#134686]"
                        >
                          Takip Et
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Henüz gönderi oluşturmadınız</p>
                  <Button
                    onClick={() => setCurrentPage('create')}
                    className="bg-[#134686] hover:bg-[#0f3565] text-white"
                  >
                    İlk Gönderini Oluştur
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profil Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Ad Soyad</Label>
                  <Input placeholder="Kullanıcı Adı" className="mt-1" />
                </div>
                <div>
                  <Label>E-posta</Label>
                  <Input type="email" placeholder="email@example.com" className="mt-1" />
                </div>
                <div>
                  <Label>Telefon</Label>
                  <Input placeholder="0532 123 45 67" className="mt-1" />
                </div>
                <Button className="bg-[#134686] hover:bg-[#0f3565] text-white">Güncelle</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Kayıtlı Adresler</CardTitle>
                <CardDescription>Sık kullandığınız adresleri kaydedin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Henüz kayıtlı adres yok</p>
                  <Button className="mt-4 bg-[#134686] hover:bg-[#0f3565] text-white">
                    Adres Ekle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

function AdminPage() {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0 })

  useEffect(() => {
    fetchShipments()
  }, [])

  const fetchShipments = async () => {
    try {
      const response = await fetch('/api/shipments')
      const data = await response.json()
      if (response.ok) {
        const allShipments = data.shipments || []
        setShipments(allShipments)
        setStats({
          total: allShipments.length,
          pending: allShipments.filter(s => s.status === 'pending').length,
          delivered: allShipments.filter(s => s.status === 'delivered').length
        })
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#134686] mb-2">Admin Paneli</h1>
          <p className="text-gray-600">Gönderi yönetimi ve raporlama</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Toplam Gönderi" value={stats.total} icon={<Package />} color="bg-[#134686]" />
          <StatCard title="Bekleyen" value={stats.pending} icon={<Clock />} color="bg-[#FEB21A]" />
          <StatCard title="Teslim Edilen" value={stats.delivered} icon={<CheckCircle />} color="bg-green-600" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tüm Gönderiler</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-[#134686] border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : shipments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Takip No</th>
                      <th className="p-3 text-left">Gönderici</th>
                      <th className="p-3 text-left">Alıcı</th>
                      <th className="p-3 text-left">Tarih</th>
                      <th className="p-3 text-left">Durum</th>
                      <th className="p-3 text-left">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs">{shipment.trackingNumber}</td>
                        <td className="p-3">{shipment.sender.name}</td>
                        <td className="p-3">{shipment.receiver.name}</td>
                        <td className="p-3 text-xs text-gray-600">
                          {new Date(shipment.createdAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="p-3">
                          <Badge className="bg-[#FEB21A] text-[#134686]">{shipment.status}</Badge>
                        </td>
                        <td className="p-3">
                          <Button size="sm" variant="outline" className="text-xs">
                            Detay
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-600">
                Henüz gönderi yok
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{title}</p>
              <p className="text-3xl font-bold text-[#134686]">{value}</p>
            </div>
            <div className={`${color} p-4 rounded-2xl text-white`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}