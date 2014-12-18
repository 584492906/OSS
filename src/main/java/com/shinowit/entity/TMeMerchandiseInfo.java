package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;


@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfo {
    private int id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private float price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
    private Collection<TMeInStockDetailsInfo> meInStockDetailsInfos;
    private TMeMerchandiseCInfo meMerchandiseCInfo;
    private TMeProStatusInfo meProStatusInfo;
    private TMeUnitInfo meUnitInfo;
    private Collection<TMeOrderDetailsInfo> meOrderDetailsInfos;
    private Collection<TMeOutStockDetailsInfo> meOutStockDetailsInfos;
    private Collection<TMeStockInfo> meStockInfos;

    @Basic
    @Column(name = "ID", insertable = false, updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }


    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "meMerchandiseInfo")
    public Collection<TMeInStockDetailsInfo> getMeInStockDetailsInfos() {
        return meInStockDetailsInfos;
    }

    public void setMeInStockDetailsInfos(Collection<TMeInStockDetailsInfo> meInStockDetailsInfos) {
        this.meInStockDetailsInfos = meInStockDetailsInfos;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfo getMeMerchandiseCInfo() {
        return meMerchandiseCInfo;
    }

    public void setMeMerchandiseCInfo(TMeMerchandiseCInfo meMerchandiseCInfo) {
        this.meMerchandiseCInfo = meMerchandiseCInfo;
    }

    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfo getMeProStatusInfo() {
        return meProStatusInfo;
    }

    public void setMeProStatusInfo(TMeProStatusInfo meProStatusInfo) {
        this.meProStatusInfo = meProStatusInfo;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo getMeUnitInfo() {
        return meUnitInfo;
    }

    public void setMeUnitInfo(TMeUnitInfo meUnitInfo) {
        this.meUnitInfo = meUnitInfo;
    }

    @OneToMany(mappedBy = "meMerchandiseInfo")
    public Collection<TMeOrderDetailsInfo> getMeOrderDetailsInfos() {
        return meOrderDetailsInfos;
    }

    public void setMeOrderDetailsInfos(Collection<TMeOrderDetailsInfo> meOrderDetailsInfos) {
        this.meOrderDetailsInfos = meOrderDetailsInfos;
    }

    @OneToMany(mappedBy = "meMerchandiseInfo")
    public Collection<TMeOutStockDetailsInfo> getMeOutStockDetailsInfos() {
        return meOutStockDetailsInfos;
    }

    public void setMeOutStockDetailsInfos(Collection<TMeOutStockDetailsInfo> MeOutStockDetailsInfos) {
        this.meOutStockDetailsInfos = MeOutStockDetailsInfos;
    }

    @OneToMany(mappedBy = "meMerchandiseInfo")
    public Collection<TMeStockInfo> getMeStockInfos() {
        return meStockInfos;
    }

    public void setMeStockInfos(Collection<TMeStockInfo> meStockInfos) {
        this.meStockInfos = meStockInfos;
    }
}
