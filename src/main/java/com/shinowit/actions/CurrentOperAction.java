package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class CurrentOperAction extends ActionSupport {
    @Resource
    private BaseDao<TAuOperInfo> dao;
    HttpServletRequest request = ServletActionContext.getRequest();
    private TAuOperInfo oper;
    private List<TAuOperInfo> list;
    private boolean success;
    private boolean result;
    private String message;


    public String valid() {

        oper = (TAuOperInfo) request.getSession().getAttribute("user");
        if (oper == null) {
            setSuccess(true);
            setResult(false);
            return SUCCESS;
        } else {
            setSuccess(true);
            setResult(true);
            list = (List) dao.findByHql("from TAuOperInfo where operName=? and pwd=?", oper.getOperName(), oper.getPwd());
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<TAuOperInfo> getList() {
        return list;
    }

    public void setList(List<TAuOperInfo> list) {
        this.list = list;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
}
