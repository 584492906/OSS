package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_OrderDetailsInfo")
public class TMeOrderDetailsInfo {
    private String id;
    private Integer num;
    private Float price;
    private TMeMerchandiseInfo meMerchandiseInfo;
    private TMeOrderInfo meOrderInfo;
    private TMeUnitInfo meUnitInfo;

    @Id
    @Column(name = "ID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }


    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfo getMeMerchandiseInfo() {
        return meMerchandiseInfo;
    }

    public void setMeMerchandiseInfo(TMeMerchandiseInfo meMerchandiseInfo) {
        this.meMerchandiseInfo = meMerchandiseInfo;
    }

    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeOrderInfo getMeOrderInfo() {
        return meOrderInfo;
    }

    public void setMeOrderInfo(TMeOrderInfo meOrderInfo) {
        this.meOrderInfo = meOrderInfo;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfo getMeUnitInfo() {
        return meUnitInfo;
    }

    public void setMeUnitInfo(TMeUnitInfo meUnitInfo) {
        this.meUnitInfo = meUnitInfo;
    }
}
