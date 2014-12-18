package com.shinowit.actions.Oper;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class OperStoreAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private List<TAuOperInfo> oper;

    public String queryForOper() {


        oper = (List)dao.findByHql("from TAuOperInfo where state='true'");

        return SUCCESS;
    }


    public List<TAuOperInfo> getOper() {
        return oper;
    }

    public void setOper(List<TAuOperInfo> oper) {
        this.oper = oper;
    }
}
