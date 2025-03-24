package com.rejs.nearlib.global.config;

import com.rejs.csvloader.config.AbstractCsvLoadCommandLineRunnerConfiguration;
import com.rejs.csvloader.config.configurer.CsvColumnValidateServiceConfigurer;
import com.rejs.csvloader.config.configurer.CsvLoadBuilder;
import com.rejs.csvloader.config.configurer.JdbcBatchInsertRepositoryConfigurer;
import com.rejs.csvloader.file.FileSystemAccessObject;
import com.rejs.csvloader.file.LocalFileSystemAccessObject;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Profile("loadcsv")
@RequiredArgsConstructor
@Configuration
public class CsvLoadConfiguration extends AbstractCsvLoadCommandLineRunnerConfiguration {

    @Override
    public CsvLoadBuilder csvLoadBuilder(CsvLoadBuilder builder) {
        return builder
                .jdbcBatchInsertRepository((new JdbcBatchInsertRepositoryConfigurer()).withDefault())
                .csvColumnValidateService((new CsvColumnValidateServiceConfigurer()).withDefault())
                ;
    }
}
