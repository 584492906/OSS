package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;


@Entity
@Table(name = "TBa_MemberInfo")
public class TBaMemberInfo {
    private String userName;
    private String pwd;
    private String email;
    private String linkName;
    private float balance;
    private Boolean status;
    private Timestamp regDate;
    private Timestamp activeDate;
    private String remark;
    private Collection<TBaMembeAddrInfo> baMembeAddrInfos;
    private Collection<TBaSupplyRecordInfo> baSupplyRecordInfos;
    private Collection<TMeOrderInfo> meOrderInfos;


    @Id
    @Column(name = "UserName")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "lName")
    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    @Basic
    @Column(name = "Balance")
    public float getBalance() {
        return balance;
    }

    public void setBalance(float balance) {
        this.balance = balance;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "RegDate")
    public Timestamp getRegDate() {
        return regDate;
    }

    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    @Basic
    @Column(name = "ActiveDate")
    public Timestamp getActiveDate() {
        return activeDate;
    }

    public void setActiveDate(Timestamp activeDate) {
        this.activeDate = activeDate;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "baMemberInfo")
    public Collection<TBaMembeAddrInfo> getBaMembeAddrInfos() {
        return baMembeAddrInfos;
    }

    public void setBaMembeAddrInfos(Collection<TBaMembeAddrInfo> baMembeAddrInfos) {
        this.baMembeAddrInfos = baMembeAddrInfos;
    }

    @OneToMany(mappedBy = "baMemberInfo")
    public Collection<TBaSupplyRecordInfo> getBaSupplyRecordInfos() {
        return baSupplyRecordInfos;
    }

    public void setBaSupplyRecordInfos(Collection<TBaSupplyRecordInfo> baSupplyRecordInfos) {
        this.baSupplyRecordInfos = baSupplyRecordInfos;
    }

    @OneToMany(mappedBy = "baMemberInfo")
    public Collection<TMeOrderInfo> getMeOrderInfos() {
        return meOrderInfos;
    }

    public void setMeOrderInfos(Collection<TMeOrderInfo> meOrderInfos) {
        this.meOrderInfos = meOrderInfos;
    }
}
