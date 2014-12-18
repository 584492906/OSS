package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2014/11/13.
 */
public class JumpAction extends ActionSupport {

    @Resource
    private BaseDao<TAuOperInfo> dao;
    HttpServletRequest request = ServletActionContext.getRequest();
    private TAuOperInfo oper;
    public String jump() {
//        oper = (TAuOperInfo) request.getSession().getAttribute("user");
//        if (oper == null) {
//            return "ok";
//        } else {
            return SUCCESS;
//        }
    }

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

}
