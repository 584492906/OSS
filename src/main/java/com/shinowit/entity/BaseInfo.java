package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/12/10.
 */
@Entity
@Table(name = "base_info")
public class BaseInfo {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Basic
    @Column(name = "company_name")
    private String companyName;
    @Basic
    @Column(name = "company_address")
    private String companyAddress;
    @Basic
    @Column(name = "Num")
    private int num;
    @Basic
    @Column(name = "Phone")
    private String phone;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
