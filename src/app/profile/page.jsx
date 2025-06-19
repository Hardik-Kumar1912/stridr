"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserIcon } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";

export default function ProfilePage() {
  const [gender, setGender] = useState("male");
  const [profileImage, setProfileImage] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="max-w-2xl mx-auto py-12 px-6 mt-20 mb-10 space-y-8 bg-[#fdfcf7] rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-[#1b5e20] mb-2">Your Profile</h1>
      <p className="text-[#33691e]">
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

        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              alert("Upload Completed");
              setProfileImage(res?.[0]?.url); // update profile image
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
                if (isUploading) return "Uploading...";
                if (profileImage) return "Change Profile Picture";
                return "Upload Profile Picture";
              },
            }}
          />
        </div>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[#2e7d32]">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          className="bg-white border border-[#a5d6a7]"
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
          className="bg-white border border-[#a5d6a7]"
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label className="text-[#2e7d32]">Gender</Label>
        <RadioGroup
          defaultValue="male"
          onValueChange={(value) => setGender(value)}
          className="flex gap-6"
        >
          {["male", "female", "other"].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="capitalize text-[#33691e]">
                {option}
              </Label>
            </div>
          ))}
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
          className="bg-white border border-[#a5d6a7]"
        />
      </div>

      <Button className="w-full mt-4 bg-[#388e3c] hover:bg-[#2e7d32] text-white">
        Save Profile
      </Button>
    </main>
  );
}
