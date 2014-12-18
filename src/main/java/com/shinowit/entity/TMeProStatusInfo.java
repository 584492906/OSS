package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_ProStatusInfo")
public class TMeProStatusInfo {
    private String proStatusId;
    private String proStatusName;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfo> meMerchandiseInfos;

    @Id
    @Column(name = "ProStatusID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getProStatusId() {
        return proStatusId;
    }

    public void setProStatusId(String proStatusId) {
        this.proStatusId = proStatusId;
    }

    @Basic
    @Column(name = "ProStatusName")
    public String getProStatusName() {
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
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


    @OneToMany(mappedBy = "meProStatusInfo")
    public Collection<TMeMerchandiseInfo> getMeMerchandiseInfos() {
        return meMerchandiseInfos;
    }

    public void setMeMerchandiseInfos(Collection<TMeMerchandiseInfo> meMerchandiseInfos) {
        this.meMerchandiseInfos = meMerchandiseInfos;
    }
}
