package com.shinowit.actions.unitinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/13.
 */
public class UpdateUnitAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> dao;
    private TMeUnitInfo unit;
    private boolean success;
    private String message;


    public String upUnitInfo() {

        boolean result = dao.update(unit);
        if (result == true) {
            setSuccess(true);
            message = "修改成功";
        } else {
            setSuccess(false);
            message = "修改失败";
        }

        return SUCCESS;
    }


    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
