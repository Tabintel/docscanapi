"use client"

import { useState } from "react"
import IDVerification from "@/app/(Home)/_components/IDVerification"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// EventDetails Component with enhanced styling for dark theme
const EventDetails = ({ eventData, setEventData, setEventTab }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="w-full py-16 flex justify-center px-4">
      <Card className="w-full max-w-md bg-dark-card border border-dark-border shadow-[0_0_15px_rgba(0,240,255,0.50)] rounded-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-3xl font-extrabold text-neon-blue tracking-tight">
            Event Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="eventName" className="text-lg font-semibold text-foreground">
              Event Name
            </Label>
            <Input
              type="text"
              id="eventName"
              name="name"
              placeholder="e.g., Global Tech Summit"
              value={eventData.name}
              onChange={handleChange}
              className="h-12 px-4 text-base bg-dark-input border-dark-border text-foreground placeholder:text-muted-foreground focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-200 rounded-lg shadow-inner"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="eventDate" className="text-lg font-semibold text-foreground">
              Event Date
            </Label>
            <Input
              type="date"
              id="eventDate"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="h-12 px-4 text-base bg-dark-input border-dark-border text-foreground focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-200 rounded-lg shadow-inner"
            />
          </div>
          <Button
            onClick={() => setEventTab(1)}
            className="w-full h-14 py-3 rounded-xl text-lg font-bold bg-neon-blue hover:bg-neon-blue/80 text-dark-primary shadow-[0_4px_10px_rgba(0,240,255,0.30)] transition-all duration-200 transform hover:scale-105"
          >
            Next: Verify ID
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// RegistrationConfirmation Component with enhanced styling for dark theme
const RegistrationConfirmation = ({ userDocumentData, eventData }) => (
  <div className="w-full py-16 flex justify-center px-4">
    <Card className="w-full max-w-md bg-dark-card border border-dark-border shadow-[0_0_15px_rgba(57,255,20,0.50)] rounded-xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-center text-3xl font-extrabold text-neon-green tracking-tight">
          Registration Confirmed!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <p className="text-lg text-foreground font-medium">Your ID has been successfully verified.</p>
        <p className="text-xl text-neon-green font-semibold">You are now registered for:</p>
        <div className="border border-dark-border bg-dark-input p-6 rounded-lg inline-block text-left shadow-inner space-y-2">
          <p className="font-bold text-xl text-foreground">Event: {eventData?.name || "My Event"}</p>
          <p className="text-gray-400 text-lg">Date: {eventData?.date || "July 18, 2025"}</p>
          <p className="text-gray-400 text-lg">
            ID Status: <span className="font-semibold text-neon-green">{userDocumentData?.data?.status || "N/A"}</span>
          </p>
          <p className="text-gray-400 text-lg">
            Verification Score:{" "}
            <span className="font-semibold text-neon-green">{userDocumentData?.data?.score || "N/A"}</span>
          </p>
        </div>
        <p className="mt-6 text-base text-gray-500">Thank you for registering!</p>
      </CardContent>
    </Card>
  </div>
)

export default function HomePage() {
  const [eventTab, setEventTab] = useState(0) // 0: Event Details, 1: ID Verification, 2: Confirmation
  const [idtype, setIDType] = useState("")
  const [userDocumentData, setUserDocumentData] = useState(null)
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [eventData, setEventData] = useState({ name: "", date: "" }) // Initialize with empty strings

  const handleUpload = (result) => {
    if (result.event === "success") {
      setImage(result.info.secure_url)
    }
  }

  const handleUploadDocscanDocuments = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post("/api/docscan", {
        img: image,
        key: process.env.NEXT_PUBLIC_PIXLAB_API_KEY,
      })
      setUserDocumentData(data)
      setEventTab(2) // Move to confirmation step
      // toast.success("ID verification successful!"); // If using a toast library
    } catch (error) {
      // toast.error(error.response?.data?.message || error.message); // If using a toast library
      console.error("ID verification failed:", error.response?.data?.message || error.message)
      setUserDocumentData({ data: { status: "Failed", score: 0 } }) // Set a failed state
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-br from-gray-900 to-black font-sans text-foreground">
      {eventTab === 0 && <EventDetails eventData={eventData} setEventData={setEventData} setEventTab={setEventTab} />}
      {eventTab === 1 && (
        <IDVerification
          setIDType={setIDType}
          image={image}
          handleUpload={handleUpload}
          handleUploadDocscanDocuments={handleUploadDocscanDocuments}
          loading={loading}
          idtype={idtype}
          eventData={eventData}
          setImage={setImage}
          userDocumentData={userDocumentData}
        />
      )}
      {eventTab === 2 && <RegistrationConfirmation userDocumentData={userDocumentData} eventData={eventData} />}
    </main>
  )
}
