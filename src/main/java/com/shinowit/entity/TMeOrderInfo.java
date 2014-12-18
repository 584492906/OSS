package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_OrderInfo")
public class TMeOrderInfo {
    private int id;
    private String billCode;
    private String postBillCode;
    private byte billStatus;
    private Timestamp orderTime;
    private String recMan;
    private String linkTel;
    private String recAddress;
    private String postCode;
    private Float totalMoney;
    private String remark;
    private Collection<TMeOrderDetailsInfo> meOrderDetailsInfos;
    private TAuOperInfo auOperInfo;
    private TBaDeliveryInfo baDeliveryInfo;
    private TBaMemberInfo baMemberInfo;
    private TMeOutStockInfo meOutStockInfo;

    @Basic
    @Column(name = "ID")
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
    @Column(name = "PostBillCode")
    public String getPostBillCode() {
        return postBillCode;
    }

    public void setPostBillCode(String postBillCode) {
        this.postBillCode = postBillCode;
    }

    @Basic
    @Column(name = "BillStatus")
    public byte getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(byte billStatus) {
        this.billStatus = billStatus;
    }

    @Basic
    @Column(name = "OrderTime")
    public Timestamp getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(Timestamp orderTime) {
        this.orderTime = orderTime;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
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
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
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


    @OneToMany(mappedBy = "meOrderInfo")
    public Collection<TMeOrderDetailsInfo> getMeOrderDetailsInfos() {
        return meOrderDetailsInfos;
    }

    public void setMeOrderDetailsInfos(Collection<TMeOrderDetailsInfo> meOrderDetailsInfos) {
        this.meOrderDetailsInfos = meOrderDetailsInfos;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getAuOperInfo() {
        return auOperInfo;
    }

    public void setAuOperInfo(TAuOperInfo auOperInfo) {
        this.auOperInfo = auOperInfo;
    }

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    public TBaDeliveryInfo getBaDeliveryInfo() {
        return baDeliveryInfo;
    }

    public void setBaDeliveryInfo(TBaDeliveryInfo baDeliveryInfo) {
        this.baDeliveryInfo = baDeliveryInfo;
    }

    @ManyToOne
    @JoinColumn(name = "UserName", referencedColumnName = "UserName")
    public TBaMemberInfo getBaMemberInfo() {
        return baMemberInfo;
    }

    public void setBaMemberInfo(TBaMemberInfo baMemberInfo) {
        this.baMemberInfo = baMemberInfo;
    }

    @ManyToOne
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfo getMeOutStockInfo() {
        return meOutStockInfo;
    }

    public void setMeOutStockInfo(TMeOutStockInfo meOutStockInfo) {
        this.meOutStockInfo = meOutStockInfo;
    }
}
