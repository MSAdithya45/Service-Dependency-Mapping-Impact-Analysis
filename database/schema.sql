-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================
-- WORKSPACES
-- =====================================================

CREATE TABLE workspaces (
    
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    workspace_name VARCHAR(150) NOT NULL,

    owner_user_id BIGINT NOT NULL,

    workspace_type ENUM("TEAM", "PERSONAL") NOT NULL,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workspace_owner
        FOREIGN KEY (owner_user_id)
        REFERENCES users(id)
) ENGINE=InnoDB;

-- =====================================================
-- DOMAINS
-- =====================================================

CREATE TABLE domains (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    domain_name VARCHAR(150) NOT NULL,

    lead_user_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_domain_lead
        FOREIGN KEY (lead_user_id)
        REFERENCES users(id)
) ENGINE=InnoDB;

-- =====================================================
-- WORKSPACE MEMBERS
-- =====================================================

CREATE TABLE workspace_members (

    workspace_id BIGINT NOT NULL,

    domain_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    role ENUM('LEAD', 'DEVELOPER') NOT NULL,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (
        workspace_id,
        domain_id,
        user_id
    ),

    CONSTRAINT fk_wm_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    CONSTRAINT fk_wm_domain
        FOREIGN KEY (domain_id)
        REFERENCES domains(id),

    CONSTRAINT fk_wm_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)

) ENGINE=InnoDB;

-- =====================================================
-- SERVICES
-- =====================================================

CREATE TABLE services (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    workspace_id BIGINT NOT NULL,

    domain_id BIGINT NOT NULL,

    service_name VARCHAR(150) NOT NULL,

    status VARCHAR(50) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_service_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    CONSTRAINT fk_service_domain
        FOREIGN KEY (domain_id)
        REFERENCES domains(id)

) ENGINE=InnoDB;

-- =====================================================
-- GRAPH VERSIONS
-- =====================================================

CREATE TABLE graph_versions (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    workspace_id BIGINT NOT NULL,

    version_no INT NOT NULL,

    created_by BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_graph_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    CONSTRAINT fk_graph_creator
        FOREIGN KEY (created_by)
        REFERENCES users(id)

) ENGINE=InnoDB;

-- =====================================================
-- DEPENDENCIES
-- =====================================================

CREATE TABLE dependencies (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    workspace_id BIGINT NOT NULL,

    version_id BIGINT NOT NULL,

    source_service_id BIGINT NOT NULL,

    target_service_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_dep_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    CONSTRAINT fk_dep_version
        FOREIGN KEY (version_id)
        REFERENCES graph_versions(id),

    CONSTRAINT fk_dep_source
        FOREIGN KEY (source_service_id)
        REFERENCES services(id),

    CONSTRAINT fk_dep_target
        FOREIGN KEY (target_service_id)
        REFERENCES services(id)

) ENGINE=InnoDB;

-- =====================================================
-- IMPACT REPORTS
-- =====================================================

CREATE TABLE impact_reports (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    workspace_id BIGINT NOT NULL,

    root_service_id BIGINT NOT NULL,

    version_id BIGINT NOT NULL,

    affected_services_count INT NOT NULL,

    affected_domains_count INT NOT NULL,

    severity_score INT NOT NULL,

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_report_workspace
        FOREIGN KEY (workspace_id)
        REFERENCES workspaces(id),

    CONSTRAINT fk_report_service
        FOREIGN KEY (root_service_id)
        REFERENCES services(id),

    CONSTRAINT fk_report_version
        FOREIGN KEY (version_id)
        REFERENCES graph_versions(id)

) ENGINE=InnoDB;



CREATE INDEX idx_workspace_version
ON dependencies(workspace_id, version_id); 




CREATE INDEX idx_source_service
ON dependencies(source_service_id);


