package com.rejs.nearlib;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
public class TestcontainersConfiguration {

    @Bean
    @ServiceConnection
    PostgreSQLContainer<?> postgreSQLContainer(){
        return new PostgreSQLContainer<>(DockerImageName.parse("rejs/pg_bigm:17-postgis").asCompatibleSubstituteFor("postgres"));
    }
}
