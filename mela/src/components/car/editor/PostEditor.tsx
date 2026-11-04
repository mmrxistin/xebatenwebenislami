// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
// La ilahe ill Allah Muhammeden Rasulullah

// Bismillahirahmanirahim 
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illAllah
// SuphanAllah, Elhamdulillah, Allahu Ekber
// LA İLAHE İLL ALLAH U VAHDEHU LA ŞERİKE LEH , LEHUL MULKU VE LEHUL HAMDU 
// YUHYI VE YUMIT
// BIYADIHIL XAYR
// VE HUVE ALA KULLİ ŞEYİN QADİR

//ALLAH U EKBER VELILLAHIL HAMD
"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "@/lib/file-dropzone";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { ClipboardEvent, useRef, useState } from "react";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import useMediaUpload, { Attachment } from "./useMediaUpload";

export default function PostEditor() {
  const { user } = useSession() ?? {};
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const mutation = useSubmitPostMutation();

  const {
    startUpload,
    attachments,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bold: {}, italic: false }), // bold'u etkinleştir, italic'i devre dışı bırak
      Placeholder.configure({ placeholder: "Haberî buraya yazın..." }),
    ],
  });

  const description =
    editor?.getText({ blockSeparator: "\n" }) || "";

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  }

  function onSubmit() {
    mutation.mutate(
      {
        content: [
          title.trim(),
          address.trim(),
          ...description
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        ],
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          setTitle("");
          setAddress("");
          editor?.commands.clearContent();
          resetMediaUploads();
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-3 sm:p-5 shadow-sm text-black w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
        <UserAvatar avatarUrl={user?.avatarUrl} className="hidden sm:inline" />
        <div className="w-full space-y-3">
          <input
            type="text"
            placeholder="Yazı Başlığı"
            className="w-full rounded-lg border px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
          <input
            type="text"
            placeholder="Konu"
            className="w-full rounded-lg border px-4 py-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            maxLength={200}
            required
          />
        </div>
      </div>
      <div {...rootProps} className="w-full">
        <EditorContent
          editor={editor}
          className={cn(
            "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-3 py-3 text-black prose prose-green", // prose ekle
            isDragActive && "outline-dashed",
          )}
          onPaste={onPaste}
        />
        <input {...getInputProps()} />
      </div>
      {!!attachments.length && (
        <AttachmentPreviews
          attachments={attachments}
          removeAttachment={removeAttachment}
        />
      )}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
        {isUploading && (
          <>
            <span className="text-sm">{uploadProgress ?? 0}%</span>
            <Loader2 className="size-5 animate-spin text-primary" />
          </>
        )}
        <AddAttachmentsButton
          onFilesSelected={startUpload}
          disabled={isUploading || attachments.length >= 10}
        />
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={
            !title.trim() || !address.trim() || !description.trim() || isUploading
          }
          className="min-w-20"
        >
           Yayınla
        </LoadingButton>
      </div>
    </div>
  );
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} />
      </Button>
      <input
        type="file"
        accept="image/*, video/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

function AttachmentPreview({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: {
  attachment: Attachment;
  onRemoveClick: () => void;
}) {
  const src = URL.createObjectURL(file);

  return (
    <div className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}>
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        <video controls className="size-fit max-h-[30rem] rounded-2xl">
          <source src={src} type={file.type} />
        </video>
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background hover:bg-foreground/60"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
