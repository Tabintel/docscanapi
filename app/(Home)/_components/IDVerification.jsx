"use client"
import Badge from "@/app/(Home)/_components/Badge"
import Image from "next/image"
import { CiImageOn } from "react-icons/ci"
import { CldUploadWidget } from "next-cloudinary"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

const IDVerification = ({
  setIDType,
  image,
  handleUpload,
  handleUploadDocscanDocuments,
  loading,
  idtype,
  eventData,
  setImage,
  userDocumentData,
}) => {
  const handleIDTypeSelection = (value) => {
    setIDType(value)
  }

  const handleSetData = () => {
    localStorage.setItem("eventData", JSON.stringify(eventData))
  }

  const idTypes = ["Passport", "Driver License", "National ID Card"]

  const isVerified = userDocumentData?.data?.score === 1

  return (
    <div className="w-full py-16 px-4">
      <div className="w-[90%] mx-auto max-w-custom_1 grid md:grid-cols-2 gap-16 md:gap-12">
        <div className="flex flex-col gap-8">
          <h3 className="text-3xl font-extrabold text-neon-blue tracking-tight">
            Verify Your Identity
            <span className="block text-base pt-2 text-gray-400 font-normal leading-relaxed">
              Upload your ID document to securely register for the event. We support various government-issued IDs.
            </span>
          </h3>
          <div className="w-full flex flex-col gap-6">
            <Label
              htmlFor="id-type-select"
              className="text-lg w-full text-foreground font-semibold flex flex-col gap-2"
            >
              ID Type
            </Label>
            <Select onValueChange={(e) => handleIDTypeSelection(e)} value={idtype}>
              <SelectTrigger
                className="w-full h-12 px-4 text-base bg-dark-input border-dark-border text-foreground focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all duration-200 rounded-lg shadow-inner"
                id="id-type-select"
              >
                <SelectValue placeholder="Select ID Type" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card border border-dark-border rounded-lg shadow-lg">
                {idTypes?.map((type, index) => (
                  <SelectGroup key={index}>
                    <SelectItem
                      value={type}
                      className="text-base text-foreground hover:bg-dark-hover focus:bg-dark-hover"
                    >
                      {type}
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-lg w-full text-foreground font-semibold flex flex-col gap-2">
            Upload ID Document
            <div className="w-full">
              {image ? (
                <Image
                  alt="ID Document"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image || "/placeholder.svg"}
                  className="h-[200px] w-full object-cover rounded-lg shadow-md border border-dark-border"
                />
              ) : (
                <CldUploadWidget
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "demo"}
                  onSuccess={handleUpload}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "dl93zl9fn"}
                  folder="Uploads"
                  sources={["local", "url", "camera"]}
                >
                  {({ open }) => (
                    <div
                      className="w-full cursor-pointer border-2 border-dashed border-neon-blue bg-dark-input h-[200px] flex flex-col gap-4 items-center justify-center rounded-lg hover:bg-dark-hover transition-colors duration-200"
                      onClick={() => open()}
                    >
                      <CiImageOn fontSize={"48px"} className="text-neon-blue" />
                      <span className="text-base text-center text-gray-400 font-medium">
                        Upload a file or drag and drop PNG, JPG, GIF up to 10MB
                      </span>
                    </div>
                  )}
                </CldUploadWidget>
              )}
            </div>
            <Input
              value={image}
              name="image"
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="Or enter your image URL here"
              className="h-12 text-base rounded-lg bg-dark-input border-dark-border text-foreground placeholder:text-muted-foreground focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 shadow-inner"
            />
          </div>
          <Button
            onClick={() => {
              handleSetData()
              handleUploadDocscanDocuments()
            }}
            disabled={image === "" || idtype === "" || loading}
            className="h-14 w-full py-3 rounded-xl text-lg font-bold bg-neon-blue hover:bg-neon-blue/80 text-dark-primary shadow-[0_4px_10px_rgba(0,240,255,0.30)] transition-all duration-200 transform hover:scale-105"
          >
            Proceed to ID Verification
          </Button>
        </div>
        <div className="w-full flex flex-col gap-8">
          <Card className="w-full p-8 border border-dark-border bg-dark-card rounded-xl flex flex-col items-center justify-center gap-6 shadow-[0_0_15px_rgba(0,240,255,0.50)]">
            <CardContent className="w-full flex flex-col items-center justify-center gap-6 p-0">
              <Badge className="text-neon-blue w-16 h-16" />
              <h3 className="text-2xl text-center font-extrabold text-neon-blue leading-tight">
                {!loading ? "Secure ID Verification" : "ID Verification in Progress"}
                <span className="block text-base pt-2 text-gray-400 font-normal leading-relaxed">
                  {!loading
                    ? "Upload a photo of your government-issued ID to complete the event registration."
                    : "We’re reviewing your ID document. You’ll receive a notification once verification is complete."}
                </span>
              </h3>
              {!loading ? (
                <Button
                  onClick={() => {
                    handleSetData()
                    handleUploadDocscanDocuments()
                  }}
                  className="h-14 w-full py-3 rounded-xl text-lg font-bold bg-neon-blue hover:bg-neon-blue/80 text-dark-primary shadow-[0_4px_10px_rgba(0,240,255,0.30)] transition-all duration-200 transform hover:scale-105"
                >
                  Verify ID
                </Button>
              ) : (
                <span className="h-14 w-full text-center px-6 text-lg font-bold text-neon-blue flex items-center justify-center">
                  Verifying...
                </span>
              )}
            </CardContent>
          </Card>

          {/* Display image with blur based on verification result */}
          {image && userDocumentData ? (
            <div className="w-full mt-4 p-6 border border-dark-border bg-dark-card rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.50)] text-center">
              <Image
                alt="ID Document Preview"
                width={0}
                sizes="100vw"
                height={0}
                loading="lazy"
                src={image || "/placeholder.svg"}
                className={`h-[250px] w-full object-cover rounded-lg shadow-inner ${!isVerified ? "filter blur-lg" : ""}`}
              />
              <p
                className={`text-center mt-4 text-base font-semibold ${isVerified ? "text-neon-green" : "text-neon-red"}`}
              >
                {isVerified ? "ID Verified Successfully!" : "ID Verification Failed. Please try again."}
              </p>
            </div>
          ) : null}
          <h5 className="text-sm text-gray-500 mt-4 text-center leading-relaxed">
            Your personal information is securely stored and will not be shared with third parties. We prioritize your
            privacy and data security.
          </h5>
        </div>
      </div>
    </div>
  )
}

export default IDVerification
