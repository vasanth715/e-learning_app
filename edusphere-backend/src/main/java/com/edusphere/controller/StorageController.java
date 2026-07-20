package com.edusphere.controller;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

@RestController
@RequestMapping("/api/storage")
@CrossOrigin
public class StorageController {

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "file";
        String extension = originalFilename.contains(".") ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String simulatedUrl = "https://edusphere-cloud-bucket.s3.amazonaws.com/uploads/" + UUID.randomUUID().toString() + extension;
        return ResponseEntity.ok(new UploadResponse(simulatedUrl, originalFilename));
    }

    @Getter @Setter
    @NoArgsConstructor @AllArgsConstructor
    public static class UploadResponse {
        private String fileUrl;
        private String fileName;
    }
}
