package com.rejs.nearlib.global.file;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileSystemAccessObject {
    public void save(String path, MultipartFile file);
    public void save(String path, Resource resource);
    public Resource load(String path);
}
