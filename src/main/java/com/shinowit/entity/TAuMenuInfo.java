package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_MenuInfo")
public class TAuMenuInfo {
    private short id;
    private String menuId;
    private String menuName;
    private String url;
    private Short sortId;
    private Boolean state;
    private String src;
    private Collection<TAuAuthorization> auAuthorizations;
    private Collection<TBaLogInfo> baLogInfos;
    private String parentMenu;

    @Basic
    @Column(name = "ID")
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    @Id
    @Column(name = "MenuID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "MenuName")
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    @Basic
    @Column(name = "URL")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    @OneToMany(mappedBy = "auMenuInfo")
    public Collection<TAuAuthorization> getAuAuthorizations() {
        return auAuthorizations;
    }

    public void setAuAuthorizations(Collection<TAuAuthorization> auAuthorizations) {
        this.auAuthorizations = auAuthorizations;
    }

    @OneToMany(mappedBy = "auMenuInfo")
    public Collection<TBaLogInfo> getBaLogInfos() {
        return baLogInfos;
    }

    public void setBaLogInfos(Collection<TBaLogInfo> baLogInfos) {
        this.baLogInfos = baLogInfos;
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
    @Basic
    @Column(name = "parent_menu_id")
    public String getParentMenu() {
        return parentMenu;
    }

    public void setParentMenu(String parentMenu) {
        this.parentMenu = parentMenu;
    }
}
