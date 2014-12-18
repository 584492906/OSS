package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014-11-05.
 */
@Entity
@Table(name = "TBa_LogInfo")
public class TBaLogInfo {
    private String id;
    private Timestamp logTime;
    private String ip;
    private String content;
    private TAuMenuInfo auMenuInfo;
    private TAuOperInfo auOperInfo;

    @Id
    @Column(name = "ID")
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "LogTime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    @Basic
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "Content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public TAuMenuInfo getAuMenuInfo() {
        return auMenuInfo;
    }

    public void setAuMenuInfo(TAuMenuInfo auMenuInfo) {
        this.auMenuInfo = auMenuInfo;
    }


    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfo getAuOperInfo() {
        return auOperInfo;
    }

    public void setAuOperInfo(TAuOperInfo auOperInfo) {
        this.auOperInfo = auOperInfo;
    }
}
