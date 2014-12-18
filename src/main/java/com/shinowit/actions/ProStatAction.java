package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeProStatusInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/26.
 */
public class ProStatAction extends ActionSupport {
    @Resource
    private BaseDao<TMeProStatusInfo> dao;

    private List<TMeProStatusInfo> list;


    public String queryProStat() {

        list = dao.listAll(TMeProStatusInfo.class);

        return SUCCESS;
    }


    public List<TMeProStatusInfo> getList() {
        return list;
    }

    public void setList(List<TMeProStatusInfo> list) {
        this.list = list;
    }
}
