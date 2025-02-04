package com.rejs.nearlib.domain.repostory;

import com.rejs.nearlib.domain.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library,Long> {
}
