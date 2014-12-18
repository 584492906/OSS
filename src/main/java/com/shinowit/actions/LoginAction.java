package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.TAuOperInfo;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

public class LoginAction extends ActionSupport {
    private TAuOperInfo oper;
    @Resource
    private BaseDao<TAuOperInfo> dao;
    private List<TAuOperInfo> operlist;
    private boolean success;
    private boolean result;
    private String message;


    private String validNum;
    HttpServletRequest request = ServletActionContext.getRequest();
    String rand = (String) request.getSession().getAttribute("rand");

    public String OperLogin() {
        List<TAuOperInfo> o = (List) dao.findByHql("from TAuOperInfo where operName=? and pwd=? and state=true", oper.getOperName(), oper.getPwd());
        if (!rand.equals(validNum)) {
            setSuccess(true);
            setResult(false);
            message = "验证码错误";
            return "false";
        } else if (o.size() > 0) {
            setSuccess(true);
            setResult(true);
            message="登录成功";
            ServletActionContext.getRequest().getSession().setAttribute("user", oper);
            return SUCCESS;
        } else {
            message = "用户名或密码错误！";
            setSuccess(true);
            setResult(false);
            return "false";
        }
    }


    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public TAuOperInfo getOper() {
        return oper;
    }

    public void setOper(TAuOperInfo oper) {
        this.oper = oper;
    }

    public List<TAuOperInfo> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfo> operlist) {
        this.operlist = operlist;
    }

    public String getValidNum() {
        return validNum;
    }

    public void setValidNum(String validNum) {
        this.validNum = validNum;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }
}
