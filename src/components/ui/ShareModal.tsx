import React, { useState } from "react";
import { FacebookShareButton, TelegramShareButton } from "react-share";
import { Facebook, Send, Instagram, X } from "lucide-react";
import Button from "./Button";

interface ShareModalProps {
  content: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ content, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
  };

  return (
    <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[420px] text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Share Link */}
        <div className="flex items-center border p-2 rounded-md mb-4">
          <input
            type="text"
            value={content}
            readOnly
            className="flex-grow bg-transparent outline-none"
          />
          <Button onClick={copyToClipboard} variant="secondary">
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <FacebookShareButton url={content}>
            <Facebook
              size={24}
              className="text-customTeal hover:scale-110 transition"
            />
          </FacebookShareButton>

          <TelegramShareButton url={content}>
            <Send
              size={24}
              className="text-customTeal hover:scale-110 transition"
            />
          </TelegramShareButton>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              size={24}
              className="text-customTeal hover:scale-110 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
