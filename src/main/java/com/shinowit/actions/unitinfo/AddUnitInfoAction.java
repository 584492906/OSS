package com.shinowit.actions.unitinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/13.
 */
public class AddUnitInfoAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> dao;
    private TMeUnitInfo unit;
    private String message;
    private boolean success;


    public String addUnit() {

        Object o = dao.insert(unit);
        if (o != null) {
            setSuccess(true);
            message = "添加成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "添加失败";
        }

        return SUCCESS;
    }


    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
