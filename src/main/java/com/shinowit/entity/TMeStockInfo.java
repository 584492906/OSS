package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_StockInfo")
public class TMeStockInfo {
    private String id;
    private float avgPrice;
    private int num;
    private TMeMerchandiseInfo meMerchandiseInfo;

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
    @Column(name = "AvgPrice")
    public float getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(float avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
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
