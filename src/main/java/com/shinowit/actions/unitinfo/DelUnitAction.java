package com.shinowit.actions.unitinfo;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/13.
 */
public class DelUnitAction extends ActionSupport {
    @Resource
    private BaseDao<TMeUnitInfo> dao;
    private TMeUnitInfo unit;
    private boolean success;
    private String message;

    public String delUnitInfo() {

        boolean result = dao.delete(unit);
        if (result == true) {
            setSuccess(true);
            message = "删除成功";
            return SUCCESS;
        } else {
            setSuccess(false);
            message = "删除失败";
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
