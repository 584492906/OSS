package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_OutStockDetailsInfo")
public class TMeOutStockDetailsInfo {
    private String id;
    private Integer num;
    private Float price;
    private Float stockPrice;
    private TMeMerchandiseInfo meMerchandiseInfo;
    private TMeOutStockInfo meOutStockInfo;

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

    @Basic
    @Column(name = "stock_price")
    public Float getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Float stockPrice) {
        this.stockPrice = stockPrice;
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
    @JoinColumn(name = "OutBillCode", referencedColumnName = "OutBillCode")
    public TMeOutStockInfo getMeOutStockInfo() {
        return meOutStockInfo;
    }

    public void setMeOutStockInfo(TMeOutStockInfo meOutStockInfo) {
        this.meOutStockInfo = meOutStockInfo;
    }
}
