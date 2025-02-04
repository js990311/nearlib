package com.rejs.nearlib.domain.library.repostory;

import com.rejs.nearlib.domain.library.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library,Long> {
}
