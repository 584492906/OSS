package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_Authorization")
public class TAuAuthorization {
    private String id;
    private Boolean isEnabled;
    private TAuMenuInfo auMenuInfo;
    private TAuRoleInfo auRoleInfo;
//    private ParentMenu parentMenu;

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    public Boolean getIsEnabled() {
        return isEnabled;
    }

    public void setIsEnabled(Boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getAuMenuInfo() {
        return auMenuInfo;
    }

    public void setAuMenuInfo(TAuMenuInfo auMenuInfo) {
        this.auMenuInfo = auMenuInfo;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfo getAuRoleInfo() {
        return auRoleInfo;
    }

    public void setAuRoleInfo(TAuRoleInfo auRoleInfo) {
        this.auRoleInfo = auRoleInfo;
    }
//    @ManyToOne
//    @JoinColumn(name = "parent_menu_id", referencedColumnName = "parent_menu_id")
//    public ParentMenu getParentMenu() {
//        return parentMenu;
//    }
//
//    public void setParentMenu(ParentMenu parentMenu) {
//        this.parentMenu = parentMenu;
//    }
}
