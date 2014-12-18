package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfo {
    private int id;
    private String billCode;
    private Byte inType;
    private Timestamp inTime;
    private String handlers;
    private Float totalMoney;
    private String remark;
    private Collection<TMeInStockDetailsInfo> meInStockDetailsInfos;
    private TAuOperInfo auOperInfo;
    private TBaSupplierInfo baSupplierInfo;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "BillCode")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }


    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
    }

    @Basic
    @Column(name = "Handler")
    public String getHandlers() {
        return handlers;
    }

    public void setHandlers(String handlers) {
        this.handlers = handlers;
    }

    @Basic
    @Column(name = "TotalMoney")
    public Float getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Float totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "meInStockInfo")
    public Collection<TMeInStockDetailsInfo> getMeInStockDetailsInfos() {
        return meInStockDetailsInfos;
    }

    public void setMeInStockDetailsInfos(Collection<TMeInStockDetailsInfo> meInStockDetailsInfos) {
        this.meInStockDetailsInfos = meInStockDetailsInfos;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getAuOperInfo() {
        return auOperInfo;
    }

    public void setAuOperInfo(TAuOperInfo AuOperInfo) {
        this.auOperInfo = AuOperInfo;
    }

    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public TBaSupplierInfo getBaSupplierInfo() {
        return baSupplierInfo;
    }

    public void setBaSupplierInfo(TBaSupplierInfo baSupplierInfo) {
        this.baSupplierInfo = baSupplierInfo;
    }
}
