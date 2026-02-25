#!/usr/bin/env node
/* eslint-disable no-console */

const API_BASE = process.env.API_BASE || 'http://127.0.0.1:4000';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-actor-type': 'employee',
  'x-actor-id': '9001',
  'x-tenant-id': '1',
};

async function req(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { ...HEADERS, ...(init.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${path} => HTTP_${res.status} ${(data && data.message) || ''}`.trim());
  }
  return data;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isNum(x) {
  return typeof x === 'number' && Number.isFinite(x);
}

function isStr(x) {
  return typeof x === 'string' && x.trim().length > 0;
}

async function run() {
  const checks = [];
  const warnings = [];
  try {
    const tenants = await req('/api/p/tenants');
    assert(Array.isArray(tenants.list), 'tenants.list 必须是数组');
    for (const row of tenants.list.slice(0, 5)) {
      assert(isNum(row.id), 'tenant.id 必须是 number');
      assert(isStr(row.name), 'tenant.name 必须是非空字符串');
      assert(isStr(row.type), 'tenant.type 必须是非空字符串');
      assert(isStr(row.status), 'tenant.status 必须是非空字符串');
      if (/^TNT-/i.test(String(row.name))) warnings.push(`租户名称疑似展示ID格式: ${row.name}`);
    }
    checks.push('tenants contract ok');

    const employees = await req('/api/p/employees');
    assert(Array.isArray(employees.list), 'employees.list 必须是数组');
    for (const row of employees.list.slice(0, 5)) {
      assert(isNum(row.id), 'employee.id 必须是 number');
      assert(isStr(row.name), 'employee.name 必须是非空字符串');
      assert(isNum(row.tenantId), 'employee.tenantId 必须是 number');
      assert(isNum(row.orgId), 'employee.orgId 必须是 number');
      assert(isNum(row.teamId), 'employee.teamId 必须是 number');
    }
    checks.push('employees contract ok');

    const products = await req('/api/p/mall/products');
    assert(Array.isArray(products.list), 'mallProducts.list 必须是数组');
    for (const row of products.list.slice(0, 5)) {
      assert(isNum(row.id), 'product.id 必须是 number');
      assert(isStr(row.title), 'product.title 必须是非空字符串');
      assert(isNum(row.points), 'product.points 必须是 number');
      assert(isNum(row.stock), 'product.stock 必须是 number');
      assert(isNum(row.sortOrder), 'product.sortOrder 必须是 number');
      assert(isStr(row.status), 'product.status 必须是非空字符串');
    }
    checks.push('mall products contract ok');

    const activities = await req('/api/p/mall/activities');
    assert(Array.isArray(activities.list), 'mallActivities.list 必须是数组');
    for (const row of activities.list.slice(0, 5)) {
      assert(isNum(row.id), 'activity.id 必须是 number');
      assert(isStr(row.title), 'activity.title 必须是非空字符串');
      assert(isStr(row.type), 'activity.type 必须是非空字符串');
      assert(isNum(row.rewardPoints), 'activity.rewardPoints 必须是 number');
      assert(isNum(row.sortOrder), 'activity.sortOrder 必须是 number');
      assert(isStr(row.status), 'activity.status 必须是非空字符串');
    }
    checks.push('mall activities contract ok');

    console.log(JSON.stringify({ ok: true, checks, warnings }, null, 2));
  } catch (error) {
    console.error(JSON.stringify({ ok: false, checks, error: error.message }, null, 2));
    process.exitCode = 1;
  }
}

run();

