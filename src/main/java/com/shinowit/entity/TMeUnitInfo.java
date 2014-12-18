package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_UnitInfo")
public class TMeUnitInfo {
    private String unitId;
    private String name;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfo> meMerchandiseInfos;
    private Collection<TMeOrderDetailsInfo> meOrderDetailsInfos;

    @Id
    @Column(name = "UnitID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public String getUnitId() {
        return unitId;
    }

    public void setUnitId(String unitId) {
        this.unitId = unitId;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "meUnitInfo")
    public Collection<TMeMerchandiseInfo> getMeMerchandiseInfos() {
        return meMerchandiseInfos;
    }

    public void setMeMerchandiseInfos(Collection<TMeMerchandiseInfo> meMerchandiseInfos) {
        this.meMerchandiseInfos = meMerchandiseInfos;
    }

    @OneToMany(mappedBy = "meUnitInfo")
    public Collection<TMeOrderDetailsInfo> getMeOrderDetailsInfos() {
        return meOrderDetailsInfos;
    }

    public void setMeOrderDetailsInfos(Collection<TMeOrderDetailsInfo> meOrderDetailsInfos) {
        this.meOrderDetailsInfos = meOrderDetailsInfos;
    }
}
