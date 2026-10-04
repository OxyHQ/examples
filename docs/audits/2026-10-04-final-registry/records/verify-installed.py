import hashlib,json,pathlib,subprocess,tarfile
root=pathlib.Path('/home/nate/Oxy/examples/.worktrees/1519-final-registry-20261004')
evidence=pathlib.Path('/home/nate/Oxy/.agent-evidence/i04-examples-final-registry-20261004')
publication=pathlib.Path('/home/nate/Oxy/.agent-evidence/root-1519-20261003/published-final-sdk-85dad/complete.json')
sha=lambda b:hashlib.sha256(b).hexdigest()
packages=[p for p in json.loads(publication.read_text())['packages'] if p['name']!='@oxy.so/mcp']
packages.append({'name':'@oxy.so/bloom','version':'6.2.1','archive':'/home/nate/Oxy/.agent-evidence/root-1519-20261003/bloom621-publication/oxy-so-bloom-6.2.1.tgz','archiveSha256':'edf4cfe3d8597e4bf86f997bceacf332f7fce4a8f92c541b3cd375decbce3a0a'})
resolver="""const f=require('fs'),p=require('path'),r=require('module').createRequire(process.argv[1]);let d=p.dirname(r.resolve(process.argv[2]));while(d!=='/'&&(!f.existsSync(p.join(d,'package.json'))||JSON.parse(f.readFileSync(p.join(d,'package.json'))).name!==process.argv[2]))d=p.dirname(d);if(d==='/')process.exit(2);process.stdout.write(f.realpathSync(d));"""
records=[];archives=[]
for pkg in packages:
 archive=pathlib.Path(pkg['archive']);assert sha(archive.read_bytes())==pkg['archiveSha256']
 with tarfile.open(archive) as t:
  members={m.name.removeprefix('package/'):sha(t.extractfile(m).read()) for m in t.getmembers() if m.isfile()}
 archives.append({k:pkg[k] for k in ['name','version','archive','archiveSha256']})
 for starter in ['vite-react-oxy','nextjs-sign-in-with-oxy','expo-sign-in-with-oxy']:
  manifest=root/starter/'package.json'; installed=pathlib.Path(subprocess.check_output(['node','-e',resolver,str(manifest),pkg['name']],text=True))
  info=json.loads((installed/'package.json').read_text());assert info['version']==pkg['version']
  for rel,digest in members.items():assert sha((installed/rel).read_bytes())==digest,(starter,pkg['name'],rel)
  records.append({'importer':starter+'/package.json','name':pkg['name'],'version':pkg['version'],'resolvedRoot':str(installed),'files':len(members),'allFilesEqual':True})
result={'kind':'examples-public-registry-installed-bytecheck','publicationReceipt':str(publication),'publicationReceiptSha256':sha(publication.read_bytes()),'archives':archives,'installed':records,'totalComparedFiles':sum(x['files'] for x in records),'allFilesEqual':True,'runtimeAuthenticationClaim':False}
(evidence/'installed-bytecheck.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({'comparisons':len(records),'files':result['totalComparedFiles'],'allFilesEqual':True}))
