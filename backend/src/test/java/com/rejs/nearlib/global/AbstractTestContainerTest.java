package com.rejs.nearlib.global;


import com.rejs.nearlib.TestcontainersConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
public abstract class AbstractTestContainerTest {
}
