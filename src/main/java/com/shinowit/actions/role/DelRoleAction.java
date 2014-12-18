package com.shinowit.actions.role;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuRoleInfo;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/4.
 */
public class DelRoleAction extends ActionSupport {
    @Resource
    private BaseDao<TAuAuthorization> dao;
    private TAuRoleInfo role;
    private boolean success;
    private boolean result;
    private String message;


    public String delRole() {
        Object o = false;
        try {
            o = dao.delBySql("from TAuAuthorization where auRoleInfo.roleId=?",role.getRoleId());
        } catch (Exception e) {
            e.printStackTrace();
        }

        if ( null!= o) {

            setResult(true);
            setSuccess(true);
            message = "删除成功！";
            return SUCCESS;
        } else {
            setSuccess(true);
            setResult(false);
            message = "删除失败！";
            return SUCCESS;
        }

    }


    public TAuRoleInfo getRole() {
        return role;
    }

    public void setRole(TAuRoleInfo role) {
        this.role = role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
