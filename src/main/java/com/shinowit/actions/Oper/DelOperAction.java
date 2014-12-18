package com.shinowit.actions.Oper;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;

import javax.annotation.Resource;


public class DelOperAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private TAuOperInfo oper;
    private boolean success;
    private boolean result;
    private String message;


    public String delOper() {
        Object o = null;
        try {
             o = dao.delBySql("update TAu_OperInfo set state='false' where operId=?",oper.getOperId());
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


    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
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
