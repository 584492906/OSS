package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfo {
    private int id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Collection<TAuAuthorization> auAuthorizations;
    private Collection<TAuOperInfo> auOperInfos;

    @Basic
    @Column(name = "ID",updatable = false,insertable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }


    @OneToMany(mappedBy = "auRoleInfo")
    public Collection<TAuAuthorization> getAuAuthorizations() {
        return auAuthorizations;
    }

    public void setAuAuthorizations(Collection<TAuAuthorization> auAuthorizations) {
        this.auAuthorizations = auAuthorizations;
    }

    @OneToMany(mappedBy = "auRoleInfo")
    public Collection<TAuOperInfo> getAuOperInfos() {
        return auOperInfos;
    }

    public void setAuOperInfos(Collection<TAuOperInfo> auOperInfos) {
        this.auOperInfos = auOperInfos;
    }
}
