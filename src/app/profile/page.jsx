"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserIcon } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [gender, setGender] = useState("male");
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (user && isLoaded) {
      setName(user.fullName || "");
      setProfileImage(user.imageUrl || null);
      setGender(user.gender || "male");
      setAge(user.publicMetadata?.age || "");
      setAddress(user.publicMetadata?.address || "");
    }
  }, [user, isLoaded]);

  if (!hasMounted || !isLoaded) return null;

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 mt-20 mb-10 space-y-8 bg-[#fdfcf7] rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-[#1b5e20] mb-2 text-center sm:text-left">
        Your Profile
      </h1>
      <p className="text-[#33691e] text-center sm:text-left">
        Fill in your details to help us create more personalized and convenient
        jogging routes.
      </p>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full border border-[#a5d6a7] overflow-hidden flex items-center justify-center bg-[#c8e6c9]">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <UserIcon className="w-12 h-12 text-[#558b2f]" />
          )}
        </div>

        <div className="w-full flex justify-center">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              alert("Upload Completed");
              setProfileImage(res?.[0]?.url);
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
            appearance={{
              button: {
                backgroundColor: "#388e3c",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                minWidth: "180px",
              },
              container: {
                display: "flex",
                justifyContent: "center",
              },
            }}
            content={{
              button({ isUploading }) {
                return isUploading ? "Uploading..." : "Upload Profile Image";
              },
            }}
          />
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#2e7d32]">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          className="bg-white border border-[#a5d6a7] w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Age */}
      <div className="space-y-2">
        <Label htmlFor="age" className="text-[#2e7d32]">
          Age
        </Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          className="bg-white border border-[#a5d6a7] w-full"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label className="text-[#2e7d32]">Gender</Label>
        <RadioGroup
          value={gender}
          onValueChange={(value) => setGender(value)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="capitalize text-[#33691e]">
              Male
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="capitalize text-[#33691e]">
              Female
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="capitalize text-[#33691e]">
              Other
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-[#2e7d32]">
          Address
        </Label>
        <Textarea
          id="address"
          placeholder="Enter your address"
          className="bg-white border border-[#a5d6a7] w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <Button className="w-full mt-4 bg-[#388e3c] hover:bg-[#2e7d32] text-white">
        Save Profile
      </Button>
    </main>
  );
}
