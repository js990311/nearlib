package com.rejs.nearlib.global.config;

import com.rejs.nearlib.global.file.FileSystemAccessObject;
import com.rejs.nearlib.global.file.LocalFileSAO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class FileSaoConfig {
    @Profile({"dev", "loadcsv"})
    @Bean
    public FileSystemAccessObject localFileSAO(){
        return new LocalFileSAO();
    }
}
