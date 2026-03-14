"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, SendHorizonal, Square } from "lucide-react";
import { omit } from "remeda";

import { cn } from "@/lib/utils";
import { useAutosizeTextArea } from "@/hooks/use-autosize-textarea";
import { Button } from "./button";

interface MessageInputBaseProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  submitOnEnter?: boolean;
  stop?: () => void;
  isGenerating: boolean;
}

interface MessageInputWithoutAttachmentProps extends MessageInputBaseProps {
  allowAttachments?: false;
}

interface MessageInputWithAttachmentsProps extends MessageInputBaseProps {
  allowAttachments: true;
  files: File[] | null;
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

type MessageInputProps =
  | MessageInputWithoutAttachmentProps
  | MessageInputWithAttachmentsProps;

export function MessageInput({
  placeholder = "Ask AI...",
  className,
  onKeyDown: onKeyDownProp,
  submitOnEnter = true,
  stop,
  isGenerating,
  ...props
}: MessageInputProps) {
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (files: File[] | null) => {
    if (props.allowAttachments) {
      props.setFiles((currentFiles) => {
        if (currentFiles === null) {
          return files;
        }

        if (files === null) {
          return currentFiles;
        }

        return [...currentFiles, ...files];
      });
    }
  };

  const onDragOver = (event: React.DragEvent) => {
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event: React.DragEvent) => {
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event: React.DragEvent) => {
    setIsDragging(false);
    if (props.allowAttachments !== true) return;
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer.files.length) {
      addFiles(Array.from(dataTransfer.files));
    }
  };

  const onPaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    const files = Array.from(items)
      .map((item) => item.getAsFile())
      .filter((file) => file !== null);

    if (props.allowAttachments && files.length > 0) {
      addFiles(files);
    }
  };
  const useStatus = ({ resloveTo }: { resloveTo: "idle" }) => {
    const [status, setStatus] = React.useState("idle");
    const onSubmit = () => {
      setStatus("loading");
      setTimeout(() => {
        setStatus(resloveTo);
      }, 1000);
    };

    return {
      onSubmit,
      status,
    };
  };
  const { status, onSubmit } = useStatus({ resloveTo: "idle" });

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (submitOnEnter && event.key === "Enter" && !event.shiftKey) {
      if (props.value.trim() !== "") {
        onSubmit();
      }
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }

    onKeyDownProp?.(event);
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const showFileList =
    props.allowAttachments && props.files && props.files.length > 0;

  useAutosizeTextArea({
    ref: textAreaRef,
    maxHeight: 240,
    borderWidth: 1,
    dependencies: [props.value, showFileList],
  });

  return (
    <div
      className="relative flex w-full items-center"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <textarea
        rows={1}
        aria-label="Write your prompt here"
        placeholder={placeholder}
        ref={textAreaRef}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
        className={cn(
          "w-full grow resize-none rounded-xl border border-input bg-background p-3 pr-24 text-sm ring-offset-background transition-[border] placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          showFileList && "pb-16",
          className
        )}
        {...(props.allowAttachments
          ? omit(props, ["allowAttachments", "files", "setFiles"])
          : omit(props, ["allowAttachments"]))}
      />

      {/* {props.allowAttachments && (
        <div className="absolute inset-x-3 bottom-0 overflow-x-scroll py-3">
          <div className="flex space-x-3">
            <AnimatePresence mode="popLayout">
              {props.files?.map((file) => {
                return (
                  <FilePreview
                    key={file.name + String(file.lastModified)}
                    file={file}
                    onRemove={() => {
                      props.setFiles((files) => {
                        if (!files) return null

                        const filtered = Array.from(files).filter(
                          (f) => f !== file
                        )
                        if (filtered.length === 0) return null
                        return filtered
                      })
                    }}
                  />
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )} */}

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
        {/* {props.allowAttachments && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-8 w-8"
            aria-label="Attach a file"
            onClick={async () => {
              const files = await showFileUploadDialog();
              addFiles(files);
            }}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        )} */}
        {isGenerating && stop ? (
          <Button
            type="button"
            size="icon"
            className="h-8 w-8"
            aria-label="Stop generating"
            onClick={stop}
          >
            <Square className="h-3 w-3 animate-pulse" fill="currentColor" />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => {
              if (props.value.trim() !== "") {
                onSubmit();
              }
            }}
            size="icon"
            className="h-8 w-10  transition-opacity flex justify-center items-center bg-green-600 hover:bg-green-700 !duration-300"
            aria-label="Send message"
            // disabled={props.value === "" || isGenerating}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <>
                  {/* <motion.span
                    key={crypto.randomUUID()}
                    // exit={{
                    //   opacity: 0,
                    //   transition: { duration: 0.6 },
                    // }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                  </motion.span> */}
                  <motion.span
                    // key={crypto.randomUUID()}
                    exit={{
                      opacity: 0,
                      x: 15,
                      transition: { duration: 0.6, type: "spring" },
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </motion.span>
                </>
              )}
              {/* {status === "loading" && (
                <motion.span
                  key={crypto.randomUUID()}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
                >
                  <Loader className="animate-spin" size="19" />
                </motion.span>
              )}
              {["success", "error"].includes(status) && (
                <motion.span
                  key={crypto.randomUUID()}
                  initial={{ opacity: 0, y: 15, scale: 0 }}
                  animate={{
                    opacity: 100,
                    y: 0,
                    scale: 1,
                    transition: { delay: 0.1, duration: 0.4 },
                  }}
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
                >
                  {status === "success" && <Check size="20" />}
                  {status === "error" && <X size="20" />}
                </motion.span>
              )} */}
            </AnimatePresence>
          </Button>
        )}
      </div>

      {props.allowAttachments && <FileUploadOverlay isDragging={isDragging} />}
    </div>
  );
}
MessageInput.displayName = "MessageInput";

interface FileUploadOverlayProps {
  isDragging: boolean;
}

function FileUploadOverlay({ isDragging }: FileUploadOverlayProps) {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center space-x-2 rounded-xl border border-dashed border-border bg-background text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <Paperclip className="h-4 w-4" />
          <span>Drop your files here to attach them.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function showFileUploadDialog() {
  const input = document.createElement("input");

  input.type = "file";
  input.multiple = true;
  input.accept = "*/*";
  input.click();

  return new Promise<File[] | null>((resolve) => {
    input.onchange = (e) => {
      const files = (e.currentTarget as HTMLInputElement).files;

      if (files) {
        resolve(Array.from(files));
        return;
      }

      resolve(null);
    };
  });
}
