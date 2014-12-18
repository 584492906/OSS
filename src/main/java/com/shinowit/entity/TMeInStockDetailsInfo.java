package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfo {
    private String id;
    private int num;
    private float price;
    private TMeInStockInfo meInStockInfo;
    private TMeMerchandiseInfo meMerchandiseInfo;

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
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }


    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfo getMeInStockInfo() {
        return meInStockInfo;
    }

    public void setMeInStockInfo(TMeInStockInfo meInStockInfo) {
        this.meInStockInfo = meInStockInfo;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfo getMeMerchandiseInfo() {
        return meMerchandiseInfo;
    }

    public void setMeMerchandiseInfo(TMeMerchandiseInfo meMerchandiseInfo) {
        this.meMerchandiseInfo = meMerchandiseInfo;
    }
}
