package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfo {
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;
    private Collection<TMeMerchandiseInfo> meMerchandiseInfos;


    @Id
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }


    @OneToMany(mappedBy = "meMerchandiseCInfo")
    public Collection<TMeMerchandiseInfo> getMeMerchandiseInfos() {
        return meMerchandiseInfos;
    }

    public void setMeMerchandiseInfos(Collection<TMeMerchandiseInfo> meMerchandiseInfos) {
        this.meMerchandiseInfos = meMerchandiseInfos;
    }
}
