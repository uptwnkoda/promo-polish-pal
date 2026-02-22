import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Upload, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

export default function LeadFiles({ leadId }: { leadId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<LeadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, [leadId]);

  const fetchFiles = async () => {
    const { data } = await supabase
      .from("lead_files")
      .select("*")
      .eq("lead_id", leadId)
      .order("uploaded_at", { ascending: false });
    if (data) setFiles(data);
  };

  const isImage = (name: string) => IMAGE_EXTS.some((ext) => name.toLowerCase().endsWith(ext));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || !user) return;
    setIsUploading(true);

    for (const file of Array.from(selectedFiles)) {
      const filePath = `${leadId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("lead-files").upload(filePath, file);
      if (uploadError) {
        toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
        continue;
      }
      await supabase.from("lead_files").insert({
        lead_id: leadId,
        file_name: file.name,
        file_path: filePath,
        file_type: isImage(file.name) ? "image" : "document",
        file_size: file.size,
        uploaded_by: user.id,
      });
    }

    fetchFiles();
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const downloadFile = async (f: LeadFile) => {
    const { data } = await supabase.storage.from("lead-files").createSignedUrl(f.file_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  };

  const deleteFile = async (f: LeadFile) => {
    await supabase.storage.from("lead-files").remove([f.file_path]);
    await supabase.from("lead_files").delete().eq("id", f.id);
    fetchFiles();
  };

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from("lead-files").getPublicUrl(path);
    return data.publicUrl;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const images = files.filter((f) => f.file_type === "image");
  const docs = files.filter((f) => f.file_type !== "image");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FolderOpen className="w-5 h-5" /> Files & Photos
        </CardTitle>
        <div>
          <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleUpload} />
          <Button size="sm" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            <Upload className="w-4 h-4 mr-1" /> {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.length === 0 && <p className="text-sm text-muted-foreground">No files uploaded yet.</p>}

        {images.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Photos</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {images.map((img) => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                  <img src={getPublicUrl(img.file_path)} alt={img.file_name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={() => downloadFile(img)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-white" onClick={() => deleteFile(img)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {docs.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Documents</h4>
            <div className="space-y-2">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium">{doc.file_name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(doc.file_size)} — {formatDate(doc.uploaded_at)}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => downloadFile(doc)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deleteFile(doc)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
