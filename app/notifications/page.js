"use client";

import React, { useState, useEffect } from "react";
import { useNotifications } from "../context/NotificationContext";
import { Bell, Filter, Trash2, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import  Button  from "../components/ui/Button";

const NotificationsPage = () => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead, isLoading } = useNotifications();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter = filter === "all" || (filter === "unread" && !notification.isRead) || (filter === "read" && notification.isRead) || notification.type === filter;

    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case "feeding_reminder":
        return "🍼";
      case "sleep_reminder":
        return "😴";
      case "vaccine_reminder":
        return "💉";
      case "milestone_celebration":
        return "🎉";
      case "essentials_alert":
        return "📦";
      case "weather_alert":
        return "🌤️";
      default:
        return "🔔";
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      urgent: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-blue-100 text-blue-800",
      low: "bg-green-100 text-green-800",
    };

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[priority]}`}>{priority}</span>;
  };

  const handleMarkAsRead = async (notificationId) => {
    await markAsRead(notificationId);
  };

  const handleDelete = async (notificationId) => {
    await deleteNotification(notificationId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] py-8 text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 mb-6 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-100 rounded-full">
                <Bell className="text-pink-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                <p className="text-gray-300">
                  {notifications.length} total • {notifications.filter((n) => !n.isRead).length} unread
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {notifications.filter((n) => !n.isRead).length > 0 && (
                <Button onClick={markAllAsRead} className="bg-pink-500 hover:bg-pink-600 text-white">
                  <Check size={16} className="mr-2" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 mb-6 shadow-xl backdrop-blur">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-gray-950 px-4 py-2 text-white placeholder:text-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-300" />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border border-white/10 bg-gray-950 px-4 py-2 text-white focus:border-pink-400 focus:ring-2 focus:ring-pink-500">
                <option value="all">All notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="feeding_reminder">Feeding reminders</option>
                <option value="sleep_reminder">Sleep reminders</option>
                <option value="vaccine_reminder">Vaccine reminders</option>
                <option value="milestone_celebration">Milestone celebrations</option>
                <option value="essentials_alert">Essentials alerts</option>
                <option value="weather_alert">Weather alerts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl backdrop-blur">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No notifications found</h3>
              <p className="text-gray-300">{searchTerm || filter !== "all" ? "Try adjusting your search or filters" : "You're all caught up! We'll notify you about important updates."}</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 transition-colors duration-200 hover:bg-white/[0.08] ${!notification.isRead ? "bg-cyan-400/10" : "bg-transparent"}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{notification.title}</h3>
                            {getPriorityBadge(notification.priority)}
                            {!notification.isRead && <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">New</span>}
                          </div>
                          <p className="mb-3 text-gray-300">{notification.message}</p>
                          <span className="text-sm capitalize text-cyan-200">{notification.type.replace("_", " ")}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {notification.actionUrl && (
                            <Link href={notification.actionUrl} className="p-2 text-gray-400 hover:text-pink-600 transition-colors">
                              <ExternalLink size={16} />
                            </Link>
                          )}
                          {!notification.isRead && (
                            <button onClick={() => handleMarkAsRead(notification._id)} className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Mark as read">
                              <Check size={16} />
                            </button>
                          )}
                          <button onClick={() => handleDelete(notification._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete notification">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
