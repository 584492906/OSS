package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TAu_OperInfo")
public class TAuOperInfo {
    private short id;
    private String operId;
    private String operName;
    private String pwd;
    private String address;
    private String linkTel;
    private String qq;
    private String email;
    private String mobile;
    private Short sortId;
    private Boolean state;
    private TAuRoleInfo auRoleInfo;
    private Collection<TBaLogInfo> baLogInfos;
    private Collection<TMeInStockInfo> meInStockInfos;
    private Collection<TMeOrderInfo> meOrderInfos;
    private Collection<TMeOutStockInfo> meOutStockInfos;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    @Id
    @Column(name = "OperID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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


    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfo getAuRoleInfo() {
        return auRoleInfo;
    }

    public void setAuRoleInfo(TAuRoleInfo AuRoleInfo) {
        this.auRoleInfo = AuRoleInfo;
    }

    @OneToMany(mappedBy = "auOperInfo")
    public Collection<TBaLogInfo> getBaLogInfos() {
        return baLogInfos;
    }

    public void setBaLogInfos(Collection<TBaLogInfo> baLogInfos) {
        this.baLogInfos = baLogInfos;
    }

    @OneToMany(mappedBy = "auOperInfo")
    public Collection<TMeInStockInfo> getMeInStockInfos() {
        return meInStockInfos;
    }

    public void setMeInStockInfos(Collection<TMeInStockInfo> meInStockInfos) {
        this.meInStockInfos = meInStockInfos;
    }

    @OneToMany(mappedBy = "auOperInfo")
    public Collection<TMeOrderInfo> getMeOrderInfos() {
        return meOrderInfos;
    }

    public void setMeOrderInfos(Collection<TMeOrderInfo> meOrderInfos) {
        this.meOrderInfos = meOrderInfos;
    }

    @OneToMany(mappedBy = "auOperInfo")
    public Collection<TMeOutStockInfo> getMeOutStockInfos() {
        return meOutStockInfos;
    }

    public void setMeOutStockInfos(Collection<TMeOutStockInfo> meOutStockInfos) {
        this.meOutStockInfos = meOutStockInfos;
    }
}
